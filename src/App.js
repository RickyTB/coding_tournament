import React, {Fragment} from 'react'

import './scss/main.global.scss'
import Layout from "./components/Layout/Layout";
import SEO from "./components/SEO/SEO";
import Main from "./containers/Main/Main";

const app = () => (
    <Fragment>
        <SEO schema="WebPage"
             title="Dericktum"
             path="/"
             contentType="website"/>
        <Layout>
            <Main/>
        </Layout>
    </Fragment>
);

export default app;