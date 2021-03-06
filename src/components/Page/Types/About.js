import { Link } from '@foundation/next';

import { withPageWithLayout } from '@shop/hooks';

import { Region } from '@shop/components/Page/Regions';

import { PortableText } from '@shop/components/Sanity';

import Header from '@shop/components/Site/Header';
import IntroSection from '@shop/components/Site/Page/Section/Intro';
import ColumnsSection from '@shop/components/Site/Page/Section/Columns';
import SlideshowSection from '@shop/components/Site/Page/Section/Slideshow';
import VideoSection from '@shop/components/Site/Page/Section/Video';

const TextBlock = ({ title, subtitle, body = [] }) => (
  <>
    {title && <h3>{title}</h3>}
    {subtitle && <h4>{subtitle}</h4>}
    <PortableText blocks={body} />
  </>
);

const Item = node => {
  const { path, item } = node;
  const { title, subtitle, tagline, intro } = item.content ?? {};

  return (
    <div className="post-item">
      <div className="post-content">
        <div className="tw-meta">
          <Link href={path}>{tagline ?? subtitle ?? '\u00A0'}</Link>
        </div>
        <h3 className="post-title">
          <Link href={path}>{title}</Link>
        </h3>
        <div className="post-intro uk-margin-medium-bottom">
          <p>{intro}</p>
        </div>
        <Link
          href={path}
          className="uk-button uk-button-default uk-button-small uk-button-radius tw-hover"
        >
          <span className="tw-hover-inner">
            <span>Meer info</span>
            <i className="ion-ios-arrow-thin-right" />
          </span>
        </Link>
      </div>
    </div>
  );
};

const ActivitiesSlider = ({ items = [] }) => (
  <div
    uk-slider="true"
    className="uk-slider tw-element tw-carousel-post tw-posts style-2"
  >
    <div className="uk-position-relative">
      <div className="uk-slider-container">
        <div
          className="uk-slider-items uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-text-center"
          data-uk-scrollspy="target:.post-item; cls:uk-animation-slide-bottom-medium; delay: 350;"
          data-uk-height-match=".post-content"
          uk-grid="true"
        >
          {items.map(item => (
            <Item key={item._id} {...item} />
          ))}
        </div>
      </div>
      <div className="uk-visible@s uk-light">
        <a
          className="uk-position-center-left-out uk-position-small"
          href="#"
          uk-slidenav-previous="true"
          uk-slider-item="previous"
        />
        <a
          className="uk-position-center-right-out uk-position-small"
          href="#"
          uk-slidenav-next="true"
          uk-slider-item="next"
        />
      </div>
    </div>
    <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin" />
  </div>
);

const AboutPage = ({ page }) => (
  <div className="main-container">
    <Header page={page} />
    <IntroSection page={page} />
    <ColumnsSection page={page} />
    <Region region={page.regions?.slideshow} Component={SlideshowSection} />
    <Region region={page.regions?.video} Component={VideoSection} />
    <section
      className="uk-section uk-background-cover"
      data-uk-parallax="bgy: -200"
      data-overlay="0.4"
      style={{
        backgroundColor: '#151515',
        backgroundImage: 'url(/assets/images/background-berries.jpg)',
      }}
    >
      <div className="uk-container">
        <div className="tw-element tw-heading uk-text-center uk-light">
          <Region region={page.regions?.activities} Component={TextBlock} />
        </div>
        <ActivitiesSlider items={page.nodes} />
      </div>
    </section>
  </div>
);

export default withPageWithLayout('about', AboutPage);
