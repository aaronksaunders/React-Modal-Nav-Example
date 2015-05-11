/**
 * Sample React Native Modal Dialog Example App
 *
 * @see - https://github.com/facebook/react-native
 * @see - https://github.com/Kureev/react-native-navbar
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  TouchableHighlight,
  Text,
  View,
} = React;


// react-native has a navigationBar object, but is seemed a bit cumbersome to utilize.
// I found the simplicity of https://github.com/Kureev/react-native-navbar much better
// and it seems to get the job done for my specific needs
//
// @see https://github.com/Kureev/react-native-navbar
//
var NavigationBar = require('react-native-navbar');

//
// The Modal View that will be presented using the default IOS slide up animation.
// this is accomplished by setting the animation on the sceneConfig options
//
var modalView = React.createClass({

  _closeModal: function() {
  // this.props.navigator -  this object is passed along by default if you look at the
  // code in renderScene you will see the property being set    
    this.props.navigator.pop()
  },  

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          THIS IS THE MODAL VIEW
        </Text>
        <TouchableHighlight
          style={[styles.button]}
          onPress={this._closeModal}>
          <Text style={styles.buttonLabel}>
            Click To Close Modal
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
});


var ModalSampleMainView = React.createClass({


/**
 * called when the user clicks the button to close the window
 */
  _openModal: function() {
    //
    // this.props.navigator -  this object is passed along by default if you look at the
    // code in renderScene you will see the property being set
    //
    // we are again adding the NavigationBar to the window, but notice that we are hiding the 
    // default back button, since we want to manage that interaction ourselves
    this.props.navigator.push({
        sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
        navigationBar: <NavigationBar title="Modal View Title"  
        hidePrev="true" />,
        component: modalView,
        passProps: {}
    })
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native Modal Dialog Sample!
        </Text>
        <Text style={styles.instructions}>
          We are using the react-native-navbar, module which can be found in npm
        </Text>
        <TouchableHighlight
          underlayColor={'gray'}
          style={[styles.button]}
          onPress={this._openModal}>
        <Text style={styles.buttonLabel}>
          Click To Open Modal
        </Text>
        </TouchableHighlight>
      </View>
    );
  }
});


//
// MAIN APPLICATION COMPONENT
//
var modalSample = React.createClass({

  renderScene(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
        navBar = React.addons.cloneWithProps(navBar, {navigator, route});
    }
    return (
        <View style={styles.view}>
            {navBar}
            <Component {...route.passProps} navigator={navigator} route={route}/>
        </View>
    );
  },

  render() {
    return (
      <Navigator
        ref="nav"
        style={styles.nav}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}        
        tintColor="#ED6063"
        initialRoute={{
            navigationBar: <NavigationBar title="Initial View"/>,
            title: "Modal View Sample App",
            component: ModalSampleMainView,
            passProps : {}
        }}/>);
    }
});


var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'white',
  },
  nav: {
    flex: 1,
  },
    button: {
    flexDirection: 'row',
    margin : 30,
    width : 200,
    padding: 10,
    justifyContent: 'center',
    borderWidth : .5
  }, 
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('modalSample', () => modalSample);