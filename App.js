import React, {Component} from 'react'
import Navigation from './src/component/Navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import {store, persistor} from './src/redux/store'

class App extends Component {
  render() {
    return(
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </>
    )
  }
}

export default App