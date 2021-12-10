import { withPageWithLayout } from '@shop/hooks';

import Regions from '@shop/components/Page/Regions';

const AboutPage = ({ page, children }) => {
  return (
    <>
      <h1>About</h1>
      <Regions page={page} renderAll />
      {children}
    </>
  );
};

export default withPageWithLayout('about', AboutPage);
