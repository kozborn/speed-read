import React from "react";
import Immutable from "immutable";
import { instanceOf } from "prop-types";

const HomeArticle = ({ article }) =>
  (<article>
    <h2>{article.get("title")}</h2>
    <div>{article.get("text")}</div>
  </article>);

HomeArticle.propTypes = {
  article: instanceOf(Immutable.Map).isRequired,
};

const HomePage = (props) => {
  const { reading, memorizing, thinking, understanding, anticipating } = props;
  return (
    <div>
      <HomeArticle article={reading} />
      <HomeArticle article={memorizing} />
      <HomeArticle article={thinking} />
      <HomeArticle article={understanding} />
      <HomeArticle article={anticipating} />
    </div>
  );
};

HomePage.propTypes = {
  memorizing: instanceOf(Immutable.Map).isRequired,
  reading: instanceOf(Immutable.Map).isRequired,
  understanding: instanceOf(Immutable.Map).isRequired,
  anticipating: instanceOf(Immutable.Map).isRequired,
  thinking: instanceOf(Immutable.Map).isRequired,
};

export default HomePage;
