import React, { Component } from 'react';
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
        Thumbnail } from 'native-base';
  
  import FacilitiesHeader from '../components/FacilitiesHeader';

type Props = {};
export default class Facilities extends Component<Props> {

  onPress = () => {
    
  }

  constructor() {
    super();
    this.state = {
      mystate: 'abooo'
    }
  }
/*
  static navigationOptions = {
    drawerLabel: ()=>{if(this.state.mystate == "abi"){
      return "Facs";
    }else{
      return "Not Facs";
    }}
  }
*/
  componentWillMount() {

  }

  render() {

    var items = [
      {
        chapter: "PHILIPPINE RED CROSS CALOOCAN",
        address: "7th Ave. Grace Park, Caloocan City",
        telephone: "3660380",
        fax: "3645752",
        email: "caloocan@redcross.org.ph",
        category: "Blood Collecting Unit/ Blood Station"
      },
      {
        chapter: "PHILIPPINE RED CROSS PASAY",
        address: "2354 CAA Compound, Aurora Blvd. (old Tramo), Pasay City",
        telephone: "0918-917-1181, 0917-815-1178",
        fax: "854-2748 (telefax)",
        email: "pasay@redcross.org.ph",
        category: "Blood Collecting Unit/ Blood Station"
      },
      {
        chapter: "PHILIPPINE RED CROSS QUEZON",
        address: "Quezon City Hall Compound, Kalayaan Avenue, Diliman, Quezon City",
        telephone: "433-6568, 433-2152, 433-2151, 435-0238, 434-3751",
        fax: "426-9627",
        email: "quezoncity@redcross.org.ph",
        category: "Blood Collecting Unit/ Blood Station"
      },
      {
        chapter: "PHILIPPINE RED CROSS RIZAL",
        address: "Shaw Blvd., Pasig City",
        telephone: "631-3993",
        fax: "631-3592, 635-2825",
        email: "rizal@redcross.org.ph",
        category: "Blood Collecting Unit/ Blood Station"
      },
      {
        chapter: "PHILIPPINE RED CROSS VALENZUELA",
        address: "Dahlia Street, Villa Teresa Subdivision, Marulas, Valenzuela City",
        telephone: "432-0273, 293-8375, 456-7767",
        fax: "-",
        email: "valenzuela@redcross.org.ph",
        category: "Blood Collecting Unit/ Blood Station"
      },
      {
        chapter: "PHILIPPINE RED CROSS TOWER",
        address: "37 EDSA cor Boni Avenue,Mandaluyong City",
        telephone: "(02) 790-2330, (02) 790-2382, (02) 790-2382",
        fax: "-",
        email: "-",
        category: "Blood Center"
      },
      {
        chapter: "PHILIPPINE RED CROSS MANILA",
        address: "Bonifacio Drive Port Area, Manila",
        telephone: "(02) 527-0861",
        fax: "-",
        email: "-",
        category: "Blood Center"
      },
    ];
    
    //Moment.locale('en');
    return (
      <Container>
        <FacilitiesHeader {...this.props} />
        <Content>
          <List dataArray={items}
            renderRow={(item) =>
              <ListItem>
              <Card width={'100%'}>
                <CardItem>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>
                      {item.chapter}{"\n"}
                    </Text>
                    <Text>
                      {item.address}{"\n"}
                      Telephone: {" " + item.telephone + "\n"}
                      Fax: {" " + item.fax + "\n"}
                      Email: {" " + item.email + "\n"}
                      category: {" " + item.category + "\n"}
                    </Text>
                  </Body>
                </CardItem>
              </Card>
              </ListItem>
            }>
          </List>
        </Content>
      </Container>
    );
  }
}


