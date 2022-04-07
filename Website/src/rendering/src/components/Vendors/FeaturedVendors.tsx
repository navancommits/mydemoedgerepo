import Link from 'next/link';
import {
  Text,
  Field,
  Image,
  withDatasourceCheck,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, SitecoreContextValue } from 'lib/component-props';
import { Vendor } from 'src/types/vendor';

type FeaturedVendorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Vendors: Vendor[];
  };
};

const FeaturedVendors = (props: FeaturedVendorsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasVendors = props?.fields?.Vendors.length;

  !hasVendors && console.log('Missing Data Source Item');

  const vendors =
    props.fields?.Vendors &&
    props.fields.Vendors.map((vendor, index) => (
      <Link key={index} href={vendor.url} passHref>
        <a className="grid-item">
          <Image field={vendor.fields.Logo} alt={vendor.fields.Name} width={265} height={265} />
          <div className="item-details">
            <Text tag="p" field={vendor.fields.Name} />
          </div>
        </a>
      </Link>
    ));

  return hasVendors ? (
    <section className="section section--light">
      <div className="section__content container">
        <Text className="section__content__title" tag="h1" field={props.fields?.Title} />
        <Text
          className="section__content__subtitle--center"
          tag="p"
          field={props.fields?.Subtitle}
        />

        <div className="item-grid">
          <div className="grid-content">{vendors}</div>
        </div>
      </div>
    </section>
  ) : isPageEditing ? (
    <p>Missing Datasource Item</p>
  ) : (
    <></>
  );
};

export default withDatasourceCheck()<FeaturedVendorsProps>(FeaturedVendors);
