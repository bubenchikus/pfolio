import universalStyles from "./UniversalStyles.module.scss";

const PageTitle = ({ pageTitle }) => {
  return <h2 className={universalStyles.pageTitle}>{pageTitle}</h2>;
};

export default PageTitle;
