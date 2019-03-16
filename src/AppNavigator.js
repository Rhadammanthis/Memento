import { createStackNavigator, TabNavigator } from 'react-navigation';
import Main from './components/Main';
import Details from './components/Details';

import { LAPIS, STRAWBERRY } from './misc/Colors'

const AppNavigator = createStackNavigator(
	{
		Main: {
            screen: Main,
            navigationOptions: ({ navigation }) => ({
                title: 'How does your day look?',               
                headerStyle: {
                    backgroundColor: LAPIS,
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
			})
		},
		Details: {
            screen: Details,
            navigationOptions: ({ navigation }) => ({
                title: 'Task\'s Details',  
                headerTintColor: '#fff',             
                headerStyle: {
                    backgroundColor: LAPIS,
                  },
                  headerTitleStyle: {
                    color: 'white',
                  },
			})
		},
    },
    {
        initialRouteName: "Main"
    }
);

export default AppNavigator;
