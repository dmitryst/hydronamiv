import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Block from './components/Block';
import About from './components/About';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/block1' component={Block} />
        <Route path='/block2' component={Block} />
        <Route path='/block3' component={Block} />
        <Route path='/block4' component={Block} />
        <Route path='/block5' component={Block} />
        <Route path='/block7' component={Block} />
        <Route path='/about' component={About} />
    </Layout>
);
