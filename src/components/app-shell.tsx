import { Link, Navigate, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  ClipboardList,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  MapPin,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  StickyNote,
  Timer,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { EMPLOYEES, getEmployeeByEmail, getEmployeeById, isAdminRole } from "@/lib/catalog";
import { getAllowedNavItems } from "@/lib/permissions";
import { authEnabled } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { UserButton } from "@/lib/auth/gates";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; group?: string };

const VERSION_STORAGE_KEY = "giong-vina-version";
const DEFAULT_VERSION = "1.0.0";

function getVersionValue() {
  if (typeof window === "undefined") return DEFAULT_VERSION;

  const saved = window.localStorage.getItem(VERSION_STORAGE_KEY);
  if (!saved) {
    window.localStorage.setItem(VERSION_STORAGE_KEY, DEFAULT_VERSION);
    return DEFAULT_VERSION;
  }

  const parts = saved.split(".").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    window.localStorage.setItem(VERSION_STORAGE_KEY, DEFAULT_VERSION);
    return DEFAULT_VERSION;
  }

  let [major, minor, patch] = parts;

  if (patch < 9) {
    patch += 1;
  } else if (minor < 9) {
    minor += 1;
    patch = 0;
  } else {
    major += 1;
    minor = 0;
    patch = 0;
  }

  const nextVersion = `${major}.${minor}.${patch}`;
  window.localStorage.setItem(VERSION_STORAGE_KEY, nextVersion);
  return nextVersion;
}

const NAV: NavItem[] = [
  { to: "/", label: "Tổng quan", icon: LayoutDashboard, group: "Điều hành" },
  { to: "/cham-cong", label: "Chấm công", icon: Timer, group: "Vận hành" },
  { to: "/check-in", label: "Check-in", icon: MapPin, group: "Vận hành" },
  { to: "/nhiem-vu", label: "Nhiệm vụ", icon: ClipboardList, group: "Vận hành" },

  { to: "/de-nghi", label: "Đề nghị", icon: FileText, group: "Nghiệp vụ" },
  { to: "/nhan-su", label: "Nhân sự", icon: Users, group: "Danh mục" },
  { to: "/trung-tam", label: "Trung tâm", icon: Building2, group: "Danh mục" },
  { to: "/ho-so", label: "Hồ sơ", icon: FolderOpen, group: "Danh mục" },
  { to: "/admin/approvals", label: "Duyệt đăng ký", icon: ShieldCheck, group: "Quản trị" },
  { to: "/admin/permissions", label: "Phân quyền", icon: ShieldCheck, group: "Quản trị" },
  { to: "/bao-cao", label: "Báo cáo", icon: BarChart3, group: "Hệ thống" },
  { to: "/ghi-chu", label: "Ghi chú", icon: StickyNote, group: "Hệ thống" },
  { to: "/chat", label: "Chat", icon: MessageSquare, group: "Hệ thống" },
  { to: "/huong-dan", label: "Hướng dẫn", icon: BookOpen, group: "Hệ thống" },
];

const MOBILE_PRIMARY = ["/cham-cong", "/", "/nhiem-vu"];
const ADMIN_ONLY_PATHS = ["/bao-cao", "/admin/approvals", "/admin/permissions"];

function NavLink({
  item,
  active,
  onClick,
  dark,
  collapsed = false,
  mobile = false,
}: {
  item: NavItem;
  active: boolean;
  onClick?: () => void;
  dark?: boolean;
  collapsed?: boolean;
  mobile?: boolean;
}) {
  const Icon = item.icon;
  const navigate = useNavigate();
  return (
    <Link
      to={item.to}
      onClick={(e) => {
        if (mobile) {
          e.preventDefault();
          const target = item.to;
          onClick?.();
          // Delay navigate to avoid Radix Dialog close animation interference
          requestAnimationFrame(() => navigate({ to: target }));
        } else {
          onClick?.();
        }
      }}
      className={cn(
        "flex h-9 items-center gap-2.5 rounded-lg px-2.5 font-medium transition-all duration-200 justify-start",
        mobile ? "text-[16px]" : "text-[13px]",
        collapsed ? "px-0" : "",
        dark
          ? active
            ? "bg-forest-fg/10 text-forest-fg"
            : "text-forest-muted hover:bg-forest-fg/5 hover:text-forest-fg"
          : active
            ? "bg-accent-soft text-accent"
            : "text-muted hover:bg-surface-2 hover:text-ink",
      )}
    >
      <Icon className="size-4 shrink-0" />
      <span
        className={cn(
          "whitespace-nowrap transition-all duration-200",
          collapsed ? "w-0 overflow-hidden opacity-0 group-hover:w-auto group-hover:opacity-100" : "w-auto opacity-100",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

function SidebarNav({ pathname, onNavigate, dark, collapsed = false, mobile = false }: { pathname: string; onNavigate?: () => void; dark?: boolean; collapsed?: boolean; mobile?: boolean }) {
  const groups = useMemo(() => {
    const map = new Map<string, NavItem[]>();
    for (const item of NAV) {
      const g = item.group ?? "";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(item);
    }
    return [...map.entries()];
  }, []);
  return (
    <nav className="flex flex-col gap-3 px-1.5 pb-6">
      {groups.map(([group, items]) => (
        <div key={group}>
          {group ? (
            <p
              className={cn(
                "mb-1 px-2 text-[10px] font-semibold tracking-[0.16em] uppercase text-left transition-all duration-200",
                dark ? "text-forest-muted/80" : "text-faint",
                collapsed ? "hidden" : "block",
              )}
            >
              {group}
            </p>
          ) : null}
          <div className="flex flex-col gap-0.5">
            {items.map((item) => (
              <NavLink
                key={item.to}
                item={item}
                active={item.to === "/" ? pathname === "/" : pathname.startsWith(item.to)}
                onClick={onNavigate}
                dark={dark}
                collapsed={collapsed}
                mobile={mobile}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const hydrate = useAppStore((s) => s.hydrate);
  const setCurrentUserId = useAppStore((s) => s.setCurrentUserId);
  const userId = useAppStore((s) => s.currentUserId);
  const pending = useAppStore((s) => s.proposals.filter((p) => p.status === "Chờ duyệt").length);
  const { user: authUser, isPending } = useCurrentUserState();
  const [appVersion, setAppVersion] = useState(DEFAULT_VERSION);
  useEffect(() => {
    setAppVersion(getVersionValue());
  }, []);
  const employee = getEmployeeById(userId) ?? EMPLOYEES[0];
  const currentUserEmployee = authUser
    ? getEmployeeByEmail(authUser.primaryEmail ?? "") ?? getEmployeeByEmail(authUser.displayName ?? "") ?? employee
    : employee;
  const isAdmin = isAdminRole(currentUserEmployee?.role);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!authEnabled || !authUser) return;
    const mapped = getEmployeeByEmail(authUser.primaryEmail ?? "") ?? getEmployeeByEmail(authUser.displayName ?? "");
    if (mapped) setCurrentUserId(mapped.id);
  }, [authUser, setCurrentUserId]);

  const allowedPaths = useMemo(
    () => getAllowedNavItems(currentUserEmployee),
    [currentUserEmployee],
  );

  const visibleNav = useMemo(
    () => NAV.filter((item) => allowedPaths.includes(item.to)),
    [allowedPaths],
  );

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return visibleNav.filter((n) => n.label.toLowerCase().includes(s)).slice(0, 6);
  }, [visibleNav, q]);

  const PUBLIC_ROUTES = ["/login", "/forgot-password"];
  const isRouteAllowed =
    PUBLIC_ROUTES.includes(pathname) ||
    pathname === "/api/auth/$" ||
    !authEnabled ||
    !authUser ||
    isAdmin ||
    !ADMIN_ONLY_PATHS.includes(pathname);

  if (authEnabled && !isPending && !authUser && !PUBLIC_ROUTES.includes(pathname)) {
    return <Navigate to="/login" replace />;
  }

  if (authEnabled && !isPending && authUser && !isRouteAllowed) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(28,107,88,0.08),_transparent_35%),var(--color-bg)]">
      <aside className="group fixed inset-y-0 left-0 z-30 hidden w-11 flex-col overflow-hidden bg-[linear-gradient(180deg,#12211c_0%,#1b2d26_100%)] text-forest-fg shadow-[12px_0_30px_-18px_rgba(18,33,28,0.9)] transition-all duration-300 ease-out hover:w-44 lg:flex">
        <div className="flex h-14 items-center border-b border-forest-fg/10 px-2 transition-all duration-300 group-hover:px-3">
          <Link to="/" className="text-forest-fg">
            <Logo compact className="group-hover:[&>span:last-child]:opacity-100" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden pt-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <SidebarNav pathname={pathname} dark collapsed />
        </div>
        <div className="border-t border-forest-fg/10 p-2 transition-all duration-300 group-hover:p-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-forest-fg/10 bg-forest-fg/5 p-1.5">
            <span className="flex size-6 items-center justify-center rounded-full bg-accent text-[9px] font-semibold text-accent-fg shadow-sm shadow-accent/30">
              {currentUserEmployee?.name
                .split(" ")
                .slice(-2)
                .map((p) => p[0])
                .join("")}
            </span>
            <div className="min-w-0 w-0 overflow-hidden transition-all duration-200 group-hover:w-auto group-hover:overflow-visible">
              <p className="truncate text-xs font-medium text-forest-fg">{currentUserEmployee?.name}</p>
              <p className="truncate text-[10px] text-forest-muted">{currentUserEmployee?.title}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-forest-fg/10 px-2 pb-3 pt-2 text-center text-[9px] tracking-[0.18em] text-forest-muted/85">
          VERSION {appVersion}
        </div>
      </aside>

      <div className="lg:pl-44">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line/80 bg-bg/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Mở menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm module, chức năng…"
              className="h-11 w-full rounded-xl border border-line bg-surface/90 pr-3 pl-10 text-sm text-ink shadow-[var(--shadow-card)] placeholder:text-faint transition focus:border-accent/30 focus:ring-2 focus:ring-accent/20 focus:outline-none"
            />
            {hits.length > 0 ? (
              <div className="absolute top-12 right-0 left-0 z-30 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card-hover)]">
                {hits.map((h) => (
                  <Link
                    key={h.to}
                    to={h.to}
                    onClick={() => setQ("")}
                    className="flex h-11 items-center gap-2 px-3 text-sm text-ink transition hover:bg-surface-2"
                  >
                    <h.icon className="size-4 text-muted" />
                    {h.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {authEnabled ? (
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-line bg-surface-2 px-2.5 py-1.5 text-xs font-medium text-muted sm:flex">
                <ShieldCheck className="size-3.5" />
                {isAdmin ? "Quản trị" : "Nhân sự"}
              </div>
              <UserButton />
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden h-11 items-center gap-2 rounded-xl bg-accent px-3.5 text-sm font-medium text-accent-fg shadow-sm shadow-accent/25 transition hover:bg-accent-hover sm:inline-flex"
            >
              <LogOut className="size-4" />
              Đăng nhập
            </Link>
          )}

          <Link
            to="/de-nghi"
            className="relative flex size-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-surface-2"
            aria-label="Thông báo"
          >
            <Bell className="size-5" />
            {pending > 0 ? (
              <span className="absolute top-2 right-2 flex size-4 items-center justify-center rounded-full bg-danger text-[10px] font-semibold text-danger-fg tabular">
                {pending}
              </span>
            ) : null}
          </Link>
        </header>

        <main className="px-4 pt-6 pb-28 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-3 border-t border-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        {visibleNav.filter((n) => MOBILE_PRIMARY.includes(n.to)).sort((a, b) => MOBILE_PRIMARY.indexOf(a.to) - MOBILE_PRIMARY.indexOf(b.to)).map((item) => {
          const Icon = item.icon;
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-16 flex-col items-center justify-center gap-1 text-[12px] font-medium",
                active ? "text-accent" : "text-muted",
              )}
            >
              <Icon className="size-6" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="bg-forest p-0 text-forest-fg">
          <div className="flex h-16 items-center justify-between px-4">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo className="text-forest-fg" />
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md text-forest-fg"
              onClick={() => setOpen(false)}
              aria-label="Đóng"
            >
              <X className="size-5" />
            </button>
          </div>
          <SidebarNav pathname={pathname} onNavigate={() => setOpen(false)} dark mobile />
        </SheetContent>
      </Sheet>

      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}
