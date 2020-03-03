import React, { Component } from 'react';

import Contact from '../../types/Contact';

interface State {
  contacts: Contact[];
}

export default class UpsertContact extends Component<{}, State> {
  public componentDidMount() { }

  public render() {
      return (<div>works</div>)
  }
}