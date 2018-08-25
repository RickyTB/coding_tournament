import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const defaultImage = '';
const defaultDescription = 'Jobsity coding tournament';

const getMetaTags = ({
                         title, description, url, image, contentType, published, updated, category, tags, twitter,
                     }) => {
    const metaTags = [
        {itemprop: 'name', content: title},
        {itemprop: 'description', content: description || defaultDescription},
        {itemprop: 'image', content: image || defaultImage},
        {name: 'description', content: description || defaultDescription},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:site', content: '@rocordob'},
        {name: 'twitter:title', content: title},
        {name: 'twitter:description', content: description || defaultDescription},
        {name: 'twitter:creator', content: twitter || '@rocordob'},
        {name: 'twitter:image:src', content: image || defaultImage},
        {name: 'og:title', content: title},
        {name: 'og:type', content: contentType},
        {name: 'og:url', content: url},
        {name: 'og:image', content: image || defaultImage},
        {name: "og:image:width", content: "1200"},
        {name: "og:image:height", content: "630"},
        {name: 'og:description', content: description || defaultDescription},
        {name: 'og:site_name', content: 'Dericktum'},
        {name: 'fb:app_id', content: '0'},
    ];

    if (published) metaTags.push({name: 'article:published_time', content: published});
    if (updated) metaTags.push({name: 'article:modified_time', content: updated});
    if (category) metaTags.push({name: 'article:section', content: category});
    if (tags) metaTags.push({name: 'article:tag', content: tags});

    return metaTags;
};

const SEO = ({
                 schema, title, description, path, contentType, published, updated, category, tags, twitter,
             }) => (
    <Helmet
        htmlAttributes={{
            lang: 'es',
            itemscope: undefined,
            itemtype: `http://schema.org/${schema}`,
        }}
        title={title}
        link={[
            {rel: 'canonical', href: path},
        ]}
        meta={getMetaTags({
            title,
            description,
            contentType,
            url: path,
            published,
            updated,
            category,
            tags,
            twitter,
        })}
    />
);

SEO.propTypes = {
    schema: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
    contentType: PropTypes.string,
    published: PropTypes.string,
    updated: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.array,
    twitter: PropTypes.string,
};

export default SEO;

/*
<SEO    schema="WebPage"
        title={title}
        image={imageUrl}
        description={body}
        path={match.path}
        contentType="website"
        published={published}
        updated={updated}
        category={category}
        tags={tags}
        twitter={twitter}
      />
 */