import { cn } from "@/lib/utils";
import * as React from "react";

type BreadcrumbContextType = {
  separator?: React.ReactNode;
  registerItem: (id: string) => void;
  unregisterItem: (id: string) => void;
  items: Set<string>;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextType | null>(null);

type BreadcrumbProps = {
  children: React.ReactNode;
  separator?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"nav">;

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, separator, ...props }, ref) => {
    const [items, setItems] = React.useState<Set<string>>(new Set());

    const registerItem = React.useCallback((id: string) => {
      setItems(prev => new Set(prev).add(id));
    }, []);

    const unregisterItem = React.useCallback((id: string) => {
      setItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, []);

    const contextValue = React.useMemo(
      () => ({
        separator,
        registerItem,
        unregisterItem,
        items,
      }),
      [separator, registerItem, unregisterItem, items],
    );

    return (
      <BreadcrumbContext.Provider value={contextValue}>
        <nav ref={ref} aria-label="breadcrumb" className={className} {...props}>
          <ol className={cn(`flex`)}>{children}</ol>
        </nav>
      </BreadcrumbContext.Provider>
    );
  },
);
Breadcrumb.displayName = "Breadcrumb";

type BreadcrumbItemProps = React.ComponentPropsWithoutRef<"li">;

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(BreadcrumbContext);
    const id = React.useId();

    if (!context) {
      throw new Error(
        `${BreadcrumbItem.displayName} must be used within ${Breadcrumb.displayName}.`,
      );
    }

    React.useEffect(() => {
      context.registerItem(id);
      return () => context.unregisterItem(id);
    }, [context, id]);

    const isLastChild = Array.from(context.items).pop() === id;

    return (
      <li ref={ref} className={cn(`group`, className)} {...props}>
        {children}
        {!isLastChild && (
          <span className="mx-2 *:!inline-block">
            {context.separator ?? "/"}
          </span>
        )}
      </li>
    );
  },
);
BreadcrumbItem.displayName = "BreadcrumbItem";

export { Breadcrumb, BreadcrumbItem };
