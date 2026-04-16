import { ReactNode } from "react";
import "./HeaderItem.css";

interface MenuItem {
  name?: string;
  shortcut?: string;
  divider?: boolean;
  onClick?: () => void;
}

interface HeaderItemProps {
  label: ReactNode;
  items?: MenuItem[];
  isActive: boolean;
  isBold?: boolean;
  onPointerDown: () => void;
  onPointerEnter: () => void;
  onItemClick: () => void;
}

export default function HeaderItem({
  label,
  items,
  isActive,
  isBold,
  onPointerDown,
  onPointerEnter,
  onItemClick,
}: HeaderItemProps) {
  return (
    <div
      className={`HeaderItemContainer ${isActive ? "active" : ""}`}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
    >
      <div className={`HeaderItemLabel ${isBold ? "bold" : ""}`}>{label}</div>
      {isActive && items && items.length > 0 && (
        <div className="HeaderDropdown">
          {items.map((item, index) =>
            item.divider ? (
              <div key={index} className="MenuDivider" />
            ) : (
              <div
                key={index}
                className="MenuItem"
                onPointerDown={(e) => {
                  e.stopPropagation();
                  if (item.onClick) item.onClick();
                  onItemClick();
                }}
              >
                <span>{item.name}</span>
                {item.shortcut && (
                  <span className="MenuShortcut">{item.shortcut}</span>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
