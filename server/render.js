import React from 'react';
import {renderToString} from 'react-dom/server';
import {ServerController} from 'cerebral';
import {Container} from 'cerebral-view-react';
import App from '../app/components/App';
import fs from 'fs';
import externalDocs from './externalDocs';

const isDeveloping = process.env.NODE_ENV !== 'production';

export default (app) => {
  const index = fs.readFileSync('./server/index.html', 'utf-8').toString();
  const getIndex = () => {
    return isDeveloping ? fs.readFileSync('./server/index.html', 'utf-8').toString() : index;
  };
  const render = (newState) => {
    const state = Object.assign({
      currentPage: 'front',
      currentDocument: 'get_started',
      menuIsOpen: false,
      menu: {
        'Tutorial: Introduction': [
          'Introduction',
          'Structuring state',
          'Defining signals',
          'Creating components'
        ],
        'Tutorial: Next step': [
          'Next step',
          'Adding modules',
          'Creating actions',
          'Adding a shared module'
        ],
        'Tutorial: Advanced': [
          'Advanced',
          'Routing',
          'Creating a service',
          'Enhancing the context',
          'Data and ux',
          'View specific state'
        ],
        'Get started': [
          'Get started',
          'The workflow',
          'Choosing a model',
          'Choosing a view',
          'Structuring your project',
          'The debugger',
          'Going to production',
          'Testing',
          'Boilerplates'
        ],
        'How do I handle...': [
          'Modals',
          'Storing server data',
          'Feedback messages',
          'Popups',
          'Factories'
        ],
        'Api': [
          'Controller',
          'Modules',
          'Signals',
          'Actions',
          'Operators',
          'Services',
          'Computed',
          'Servercontroller',
          'Context providers'
        ],
        'Views': Object.keys(externalDocs.views),
        'Community modules': Object.keys(externalDocs.modules),
        'Context providers': Object.keys(externalDocs.providers)
      }
    }, newState);
    const controller = ServerController(state);

    return {
      state: JSON.stringify(state, null, 2),
      html: renderToString(<Container controller={controller} style={{height: '100vh'}}><App/></Container>)
    };
  };

  app.get('/', (req, res) => {
    res.type('html');
    const view = render();
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/documentation', (req, res) => {
    res.type('html');
    const view = render({
      currentPage: 'documentation',
      currentDocument: 'introduction'
    });
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/documentation/:doc', (req, res) => {
    res.type('html');
    const view = render({
      currentPage: 'documentation',
      currentDocument: req.params.doc
    });
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });

  app.get('/contributors', (req, res) => {
    res.type('html');
    const view = render({
      currentPage: 'contributors'
    });
    res.send(getIndex().replace('${body}', view.html).replace('${BOOTSTRAP_STATE}', view.state));
  });
};
