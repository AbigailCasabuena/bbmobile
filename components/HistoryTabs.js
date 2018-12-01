import React, { Component } from 'react';
/*import {
  StyleSheet,
  Text,
  View,
} from 'react-native';*/
import HistoryHeader from './HistoryHeader';
import HistorySubHeader from './HistorySubHeader';
import History from './History';
import HistoryRequests from './HistoryRequests';
import ForgotPassword from './ForgotPassword'
import { Container, 
        Header, 
        Content, 
        List, 
        ListItem, 
        Text, 
        Icon, 
        Left, 
        Body, 
        Right, 
        Switch,
        Button,
        Card,
        CardItem,
        Thumbnail,
        Tab,
        TabHeading,
        Tabs,
        ScrollableTab} from 'native-base';
//import { YellowBox } from 'react-native';
//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {};
export default class HistoryTabs extends Component<Props> {
  /*constructor(props) {
    super(props)

  }*/

  onPress = () => {
    
  }

  constructor() {
    super();
    this.state = {
        data: [],
        selected: "Donations",
    }
  }


  componentDidMount() {
    //alert('hello');
    
  }


  render() {
    return (
      <Container>
        <HistoryHeader {...this.props} />
        <Tabs renderTabBar={()=> <ScrollableTab style={{backgroundColor:'#B81E12'}}/>}>
          <Tab heading={<TabHeading style={{backgroundColor:'#B81E12'}}>
                 <Text style={{color: 'white'}}>Blood Donations</Text>
               </TabHeading>}>
            <History />
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor:'#B81E12'}}>
                 <Text style={{color: 'white'}}>Blood Requests</Text>
               </TabHeading>}>
            <HistoryRequests />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}


