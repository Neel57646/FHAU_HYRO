import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection> encapsulates the previous and next pagination behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  ariaLabel,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  ariaLabel?: string;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        const pillClass =
          'inline-flex h-12 items-center justify-center rounded-full border border-brand px-7 text-[14px] font-extrabold text-brand transition-colors hover:bg-brand hover:text-cream';

        return (
          <div>
            <div className="mb-8 flex justify-center empty:mb-0">
              <PreviousLink className={pillClass}>
                {isLoading ? 'Loading…' : '↑ Load previous'}
              </PreviousLink>
            </div>
            {resourcesClassName ? (
              <div
                aria-label={ariaLabel}
                className={resourcesClassName}
                role={ariaLabel ? 'region' : undefined}
              >
                {resourcesMarkup}
              </div>
            ) : (
              resourcesMarkup
            )}
            <div className="mt-10 flex justify-center empty:mt-0">
              <NextLink className={pillClass}>
                {isLoading ? 'Loading…' : 'Load more ↓'}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
