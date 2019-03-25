import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Button,
} from 'react-native';


import {FloatingLabelInput} from "./FloatingLabelInput";


import produce from 'immer';


import {
    List,
} from 'react-native-elements';

import {WebBrowser} from 'expo';

import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };


    constructor(props) {
        super(props);
        this.state = {
            food: 'java',
            data: [
                {
                    name: {
                        first: 'Michael'
                    },
                    picture: {
                        thumbnail: null
                    },
                    quantity: 0,
                    quantityText: '0'
                },
                {
                    name: {
                        first: 'Great'
                    },
                    picture: {
                        thumbnail: null
                    },
                    quantity: 0,
                    quantityText: '0'
                }
            ]
        };

        this.increaseOrderQuantity = this.increaseOrderQuantity.bind(this);
        this.decreaseOrderQuantity = this.decreaseOrderQuantity.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
    }

    increaseOrderQuantity(item) {
        const itemIndex = this.state.data.indexOf(item);

        // this.setState(({data}) => ({
        //     data: [
        //         ...data.slice(0, itemIndex),
        //         {
        //             ...item,
        //             quantity: item.quantity + 1
        //         },
        //         ...data.slice(itemIndex + 1)
        //     ]
        // }));

        // this.setState(produce(draft => {
        //     draft.data[itemIndex].quantity++;
        // }));

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];

            ++itemToChange.quantity;
            itemToChange.quantityText = itemToChange.quantity.toString();
        }));
    }

    decreaseOrderQuantity(item) {
        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];

            --itemToChange.quantity;
            itemToChange.quantityText = itemToChange.quantity.toString();
        }));
    }


    changeQuantity(item, text) {
        console.log('blah');
        console.log(text);

        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];
            itemToChange.quantityText = text || '';
            itemToChange.quantity = parseInt(text) || 0;
        }));
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) => (
                            <>
                                {/*<ListItem*/}
                                {/*roundAvatar*/}
                                {/*title={`${item.name.first} ${item.name.last}`}*/}
                                {/*subtitle={item.email}*/}
                                {/*// avatar={{uri: item.picture.thumbnail}}*/}
                                {/*containerStyle={{borderBottomWidth: 0}}*/}
                                {/*/>*/}

                                <View style={styles.item} keyExtractor={item => item.name.first}>
                                    <Text>{item.name.first}</Text>
                                    <Image
                                        source={{
                                            uri: "https://facebook.github.io/react-native/img/favicon.png",
                                            // width: 64,
                                            // height: 64
                                            width: 350,
                                            height: 350,
                                        }}
                                        resizeMethod='scale'
                                    />

                                    {/*
                                        Initial quantity: 0
                                            Order
                                        Quantity: 1
                                            Add one more
                                            Cancel Order
                                        Quantity: >1
                                            Add one more
                                            Less one
                                    */}
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                        <Button
                                            onPress={() => this.increaseOrderQuantity(item)}
                                            title={item.quantity === 0 ? 'Order' : 'Add one more'}/>
                                        {item.quantity > 0 &&
                                        <Button
                                            onPress={() => this.decreaseOrderQuantity(item)}
                                            title={item.quantity > 1 ? 'Less one' : 'Cancel this'}
                                        />}
                                    </View>

                                    {(item.quantity > 0 || item.quantityText === '') &&
                                    <View>
                                        <FloatingLabelInput
                                            label="Quantity"
                                            value={item.quantityText}
                                            onChangeText={text => this.changeQuantity(item, text)}
                                        />
                                    </View>
                                    }
                                </View>
                            </>
                        )}
                        keyExtractor={item => item.name.first}
                    />
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

                    <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
                        <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
                    </View>
                </View>
            </SafeAreaView>

        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
                <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
                    Learn more
                </Text>
            );

            return (
                <Text style={styles.developmentModeText}>
                    Development mode is enabled, your app will be slower but you can use useful development
                    tools. {learnMoreButton}
                </Text>
            );
        } else {
            return (
                <Text style={styles.developmentModeText}>
                    You are not in development mode, your app will run at full speed.
                </Text>
            );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
            'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: null,
    },
    imageSize: {
        //newWidth is the width of the device divided by 4.
        //This is so that four images will display in each row.
        width: 64,
        height: 64,
        padding: 10,
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
