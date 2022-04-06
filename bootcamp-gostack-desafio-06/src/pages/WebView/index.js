import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    url: '',
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const repository = navigation.getParam('repository');

    this.setState({ url: repository.html_url });
  }

  render() {
    const { url } = this.state;

    return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
  }
}
