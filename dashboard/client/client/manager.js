import * as ServiceWorker from './lib/ServiceWorker';

import Application from './components/Application';

ServiceWorker.init();

ReactDOM.render(
  React.createElement(Application, {
    // props
  }, null),
  document.getElementById('root')
);
