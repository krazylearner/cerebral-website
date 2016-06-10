import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';

import Menu from '../Menu';
import GetStarted from './GetStarted';
import StructuringState from './StructuringState';
import DefiningSignals from './DefiningSignals';
import CreatingComponents from './CreatingComponents';
import AddingModules from './AddingModules';
import CreatingActions from './CreatingActions';
import AddingASharedModule from './AddingASharedModule';

const pages = {
  'get_started': GetStarted,
  'structuring_state': StructuringState,
  'defining_signals': DefiningSignals,
  'creating_components': CreatingComponents,
  'adding_modules': AddingModules,
  'creating_actions': CreatingActions,
  'adding_a_shared_module': AddingASharedModule
};

@Cerebral({
  currentDocument: 'currentDocument'
})
class Documentation extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.currentDocument !== this.props.currentDocument) {
      document.body.scrollTop = 0;
    }
  }
  render() {
    const Page = pages[this.props.currentDocument];

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logoWrapper} onClick={() => this.props.signals.rootRouted()}>
            <img src="/cerebral.png" />
            <div className={styles.title}>Cerebral</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.menu}>
            <div className={styles.fixedMenuWrapper}>
              <Menu />
            </div>
          </div>
          <div className={styles.document}>
            {
              Page ?
                <Page />
              :
                null
            }
          </div>
        </div>
      </div>
    );
  }
}

 export default Documentation;
