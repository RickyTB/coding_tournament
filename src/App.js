import React from 'react'

import './scss/main.scss'
import Layout from "./components/Layout/Layout";
import Switcher from "./components/Navigation/Switcher/Switcher";
import SEO from "./components/SEO/SEO";

const app = () => (
    <div>
        <SEO schema="WebPage"
             title="Dericktum"
             path="/"
             contentType="website"/>
        <Layout>
            <Switcher/>
        </Layout>
    </div>
);

export default app;