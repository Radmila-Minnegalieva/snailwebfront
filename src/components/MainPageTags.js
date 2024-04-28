import React from "react";

const MainPageTags = () => {
    const tags_arr = ['обувь', 'спорт', 'low polly', 'одежда', 'кроссовки', 'низгополигональная модель', 'модель', 'принтер', 'люди', 'sport', 'обувь', 'спорт', 'low polly', 'одежда', 'кроссовки', 'низгополигональная модель', 'модель', 'принтер', 'люди', 'sport'];
    const tags = tags_arr.map((item) => <span>{item}</span>)
    return(
        <div class="mainpage__tags-container">
            {tags}
            {tags}
        </div>
    )
}

export default MainPageTags;