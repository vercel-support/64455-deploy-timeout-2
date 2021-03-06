import { useMemo } from 'react';
import { isBlank } from '@foundation/lib/util';
import { useQuery } from '@foundation/next';

import { urlFor } from '@app/hooks/image';

import { PortableText } from '@shop/components/Sanity';

const Image = ({ imageUrl, title, small }) => (
  <div
    className={`tw-element uk-text-center uk-margin-remove-top uk-padding-remove-vertical uk-${
      small ? 'hidden' : 'visible'
    }@m`}
  >
    <img src={imageUrl} alt={title} />
  </div>
);

export const View = ({
  title,
  body,
  tip,
  ingredients = [],
  images = [],
  scrollspy = false,
  children,
}) => {
  const imageUrl = useMemo(
    () =>
      images[0]
        ? urlFor(images[0]).width(900).height(600).auto('format').url()
        : null,
    [images]
  );

  return (
    <div className="main-container">
      <section className="uk-section">
        {children}
        <div
          className="uk-container uk-margin-large-bottom"
          data-uk-scrollspy={
            scrollspy
              ? 'target: > div; cls:uk-animation-slide-bottom-medium; delay: 600;'
              : null
          }
        >
          <div
            className="tm-recipe uk-child-width-expand uk-grid-medium uk-margin-top"
            data-uk-grid
          >
            {imageUrl && <Image imageUrl={imageUrl} title={title} small />}
            <div className="tm-recipe-sidebar uk-width-1-3@m no-page-break">
              <h2 className="entry-title uk-text-left">{title}</h2>
              {!isBlank(ingredients) && (
                <div className="entry-cats tw-meta uk-text-left uk-margin-large-top uk-margin-bottom">
                  Ingrediënten
                </div>
              )}
              {ingredients.map(({ _key, title, list }) => (
                <div key={_key} className="tm-ingredients no-page-break">
                  {!isBlank(title) && (
                    <p className="uk-text-xsmall uk-text-muted uk-text-lowercase">
                      {title}
                    </p>
                  )}
                  <ul className="tm-list-columns uk-list uk-list-divider no-page-break">
                    {list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="tm-recipe-main">
              {imageUrl && <Image imageUrl={imageUrl} title={title} />}
              <div className="uk-child-width-1-1 uk-grid-medium" data-uk-grid>
                <div className="no-page-break">
                  <div className="entry-cats tw-meta uk-text-left">
                    Bereiding
                  </div>
                  <PortableText blocks={body} />
                </div>
                {!isBlank(tip) && (
                  <div className="no-page-break">
                    <div className="entry-cats tw-meta uk-text-left">Tip</div>
                    <PortableText blocks={tip} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const RecipeView = ({ id, scrollspy = false }) => {
  const result = useQuery(
    ['recipes', id],
    async () => {
      if (isBlank(id)) return { error: 'invalid id' };
      const response = await fetch(`/api/recipes/${id}`);
      if (response.ok) {
        return response.json();
      } else {
        return { error: 'invalid request' };
      }
    },
    {
      staleTime: 60 * 1000,
      keepPreviousData: true,
    }
  );

  if (!result.data || result.data?.error) {
    return (
      <div className="main-container">
        <section className="uk-section uk-height-large uk-flex uk-flex-center uk-flex-middle">
          <div data-uk-spinner />
        </section>
      </div>
    );
  } else {
    return <View key={id} {...result.data} scrollspy={scrollspy} />;
  }
};

export default RecipeView;
