"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NavItem } from "@/config/routes";
import { SITE, TEL_HREF } from "@/config/site";
import BookButton from "./BookButton";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

const DESKTOP_QUERY = "(min-width: 960px)";

/**
 * Site header. Dropdowns are real buttons (tap, Enter, Space, Arrow keys, Escape), open on
 * hover only for a mouse, close on outside click and on route change, and never hide
 * the links they contain from keyboard users.
 */
export default function Header({ online, nav }: { online: boolean; nav: NavItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setOpenKey(null);
  }, []);

  // Close menus when the route changes (also covers links followed from inside a menu).
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      // Defer: state updates inside an effect body are avoided by scheduling.
      const t = setTimeout(closeAll, 0);
      return () => clearTimeout(t);
    }
  }, [pathname, closeAll]);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close everything when moving to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mq.matches) closeAll();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeAll]);

  // Outside click closes an open dropdown.
  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenKey(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openKey]);

  const itemsOf = (key: string) =>
    Array.from(
      headerRef.current?.querySelectorAll<HTMLElement>(`#menu-${key} a`) ?? [],
    );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;

    if (e.key === "Escape" && (menuOpen || openKey)) {
      e.stopPropagation();
      const key = openKey;
      setOpenKey(null);
      if (!desktop) setMenuOpen(false);
      if (key && (desktop || !menuOpen)) triggers.current[key]?.focus();
      else toggleRef.current?.focus();
      return;
    }

    // Arrow keys inside an open dropdown.
    if (openKey && ["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
      const links = itemsOf(openKey);
      const trigger = triggers.current[openKey];
      const at = links.indexOf(document.activeElement as HTMLElement);
      if (links.length && (at >= 0 || document.activeElement === trigger)) {
        e.preventDefault();
        let next = at;
        if (e.key === "ArrowDown") next = at + 1;
        if (e.key === "ArrowUp") next = at - 1;
        if (e.key === "Home") next = 0;
        if (e.key === "End") next = links.length - 1;
        if (next < 0) trigger?.focus();
        else links[Math.min(next, links.length - 1)].focus();
      }
      return;
    }

    // Keep Tab inside the header while the mobile menu is open.
    if (e.key === "Tab" && menuOpen && !desktop) {
      const items = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      ).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // Hover opens a dropdown for a mouse on desktop only. A short delay stops flicker when the
  // pointer crosses the gap between the trigger and the panel.
  const hover = (key: string, open: boolean) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !window.matchMedia(DESKTOP_QUERY).matches) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open) setOpenKey(key);
    else closeTimer.current = setTimeout(() => setOpenKey((k) => (k === key ? null : k)), 140);
  };

  const isActive = (item: NavItem) =>
    item.href
      ? pathname === item.href
      : item.children?.some((c) => pathname === c.href) ?? false;

  return (
    <header className="site-header" ref={headerRef} onKeyDown={onKeyDown}>
      <div className="container">
        <div className="header-bar">
          <Link href="/" className="brand" aria-label={`${SITE.name}, home`}>
            <Image
              src="/images/namokar-logo.webp"
              alt={SITE.name}
              width={819}
              height={230}
              loading="eager"
              sizes="160px"
            />
          </Link>

          <nav id="site-nav" className="nav" aria-label="Main" data-open={menuOpen}>
            <ul className="nav-list">
              {nav.map((item) =>
                item.children ? (
                  <li
                    key={item.key}
                    className="nav-item has-sub"
                    onPointerEnter={hover(item.key, true)}
                    onPointerLeave={hover(item.key, false)}
                  >
                    <button
                      ref={(el) => {
                        triggers.current[item.key] = el;
                      }}
                      type="button"
                      className="nav-link nav-sub-toggle"
                      data-active={isActive(item) || undefined}
                      aria-expanded={openKey === item.key}
                      aria-controls={`menu-${item.key}`}
                      onClick={() => setOpenKey((k) => (k === item.key ? null : item.key))}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                          e.preventDefault();
                          setOpenKey(item.key);
                          requestAnimationFrame(() => itemsOf(item.key)[0]?.focus());
                        }
                      }}
                    >
                      {item.label}
                      <ChevronDownIcon className="chev" width={18} height={18} />
                    </button>
                    <ul id={`menu-${item.key}`} className="submenu" data-open={openKey === item.key}>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`submenu-link${c.label.startsWith("View all") ? " submenu-all" : ""}`}
                            aria-current={pathname === c.href ? "page" : undefined}
                            onClick={closeAll}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.key} className="nav-item">
                    <Link
                      href={item.href!}
                      className="nav-link"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
            <BookButton online={online} className="btn btn--primary nav-book" onNavigate={closeAll} />
          </nav>

          <a
            href={TEL_HREF}
            className={`header-call${online ? "" : " header-call--primary"}`}
            aria-label={`Call ${SITE.phone.display}`}
          >
            <PhoneIcon width={20} height={20} />
            <span className="call-sm">Call</span>
            <span className="call-lg">
              <span className="call-prefix">Call </span>
              {SITE.phone.display}
            </span>
          </a>

          {online && <BookButton online className="btn btn--primary header-book" />}

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => {
              setMenuOpen((v) => !v);
              setOpenKey(null);
            }}
          >
            {menuOpen ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
