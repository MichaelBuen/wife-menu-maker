import React from 'react';
import {
    Image,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Button,
    Clipboard,
    KeyboardAvoidingView,
} from 'react-native';

import {FloatingLabelInput} from "./FloatingLabelInput";

import produce from 'immer';


import {styles} from "../styles";

import beefBrocolli from '../assets/images/beef-brocolli-thumb.jpeg';
import chaofanThumbnail from '../assets/images/chao-fan-thumbnail.jpg';
import shrimpThumbnail from '../assets/images/shrimp-thumbnail.jpeg';
import dumplingThumbnail from '../assets/images/dumpling-thumbnail.jpg';
import fishThumbnail from '../assets/images/fish-thumbnail.jpeg';
import beefSesame from '../assets/images/beef-sesame.jpg';


import {
    List,
} from 'react-native-elements';

import {WebBrowser} from 'expo';

import {MonoText} from '../components/StyledText';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    static colors = ['#CCCCFF', '#CCFFCC'];

    recentlyUpdatedIndex = 0;

    constructor(props) {
        super(props);
        this.state = {
            food: 'java',
            kindFilter: '',
            data: [
                {
                    name: "B1",
                    kind: '牛肉',
                    picture: {
                        thumbnail: beefBrocolli
                    },
                    quantity: 0,
                    quantityText: '0',
                    focused: false
                },
                {
                    name: 'B2',
                    kind: '鸡肉',
                    picture: {
                        thumbnail: shrimpThumbnail
                    },
                    quantity: 0,
                    quantityText: '0',
                    focused: false
                },
                {
                    name: 'B3',
                    kind: '猪肉',
                    picture: {
                        thumbnail: dumplingThumbnail,
                    },
                    quantity: 0,
                    quantityText: '0',
                    focused: false
                },
                {
                    name: 'B4',
                    kind: '海鲜',
                    picture: {
                        thumbnail: fishThumbnail
                    },
                    quantity: 0,
                    quantityText: '0',
                    focused: false
                },
                {
                    name: 'B5',
                    kind: '牛肉',
                    picture: {
                        thumbnail: beefSesame
                    },
                    quantity: 0,
                    quantityText: '0',
                    focused: false
                }

            ]
        };

        this.increaseOrderQuantity = this.increaseOrderQuantity.bind(this);
        this.decreaseOrderQuantity = this.decreaseOrderQuantity.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.sort = this.sort.bind(this);
    }

    increaseOrderQuantity(item) {
        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];

            ++itemToChange.quantity;
            itemToChange.quantityText = itemToChange.quantity.toString();

            this.recentlyUpdatedIndex = itemIndex;
            if (this.recentlyUpdatedIndex === this.state.data.length - 1) {
                this.refs.flatList.scrollToEnd();
            }
        }));


    }

    decreaseOrderQuantity(item) {
        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];

            --itemToChange.quantity;
            itemToChange.quantityText = itemToChange.quantity.toString();
        }));

        this.recentlyUpdatedIndex = itemIndex;
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.recentlyUpdatedIndex === this.state.data.length - 1) {
            this.refs.flatList.scrollToEnd();
        }
    }


    handleFocus(item) {
        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];
            itemToChange.focused = true;
        }));

        console.log('focusing');
    }

    handleBlur(item) {
        const itemIndex = this.state.data.indexOf(item);

        this.setState(produce(draft => {
            const itemToChange = draft.data[itemIndex];
            itemToChange.focused = false;
        }));
    }


    sort() {
        const withOrdersList = [];

        const withOrders = this.state.data.filter(food => food.quantity > 0);

        for (const order of withOrders) {
            withOrdersList.push(`${order.name.first}: ${order.quantity}`);
        }


        const ordersAsString = withOrdersList.join('\n');

        Clipboard.setString(ordersAsString);
    }

    filterByKind(kindFilter) {
        this.setState({kindFilter});
    }


    render() {
        return (
            <SafeAreaView style={styles.safeAreaViewContainer}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <FlatList
                        ref='flatList'
                        onContentSizeChange={() => {
                            if (this.recentlyUpdatedIndex === this.state.data.length - 1) {
                                this.refs.flatList.scrollToEnd();
                            }
                        }}
                        data={this.state.data.filter(food => this.state.kindFilter === '' || food.kind === this.state.kindFilter)}
                        keyExtractor={item => item.name}
                        renderItem={({item, index}) => (
                            <>
                                <View
                                    style={{
                                        ...styles.item,
                                        backgroundColor: HomeScreen.colors[index % 2]
                                    }}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{flex: 1}}>{item.name}</Text>
                                        <Text style={{alignItems: 'flex-end'}}>{item.kind}</Text>
                                    </View>
                                    {/*<Image*/}
                                    {/*source={{*/}
                                    {/*uri: "https://facebook.github.io/react-native/img/favicon.png",*/}
                                    {/*// width: 64,*/}
                                    {/*// height: 64*/}
                                    {/*width: 350,*/}
                                    {/*height: 350,*/}
                                    {/*}}*/}
                                    {/*resizeMethod='scale'*/}
                                    {/*/>*/}

                                    <View style={{alignItems: 'center'}}>
                                        {item.picture.thumbnail ?
                                            <Image
                                                source={item.picture.thumbnail}
                                                style={{
                                                    width: 300,
                                                    height: 240,
                                                }}
                                            />
                                            :
                                            <Image source={require('../assets/images/robot-dev.png')}/>
                                        }
                                    </View>

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
                                    <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5}}>
                                        <Button
                                            onPress={() => this.increaseOrderQuantity(item)}
                                            title={item.quantity === 0 ? 'Order' : 'Add one more'}/>
                                        <View style={{padding: 5}}/>
                                        {item.quantity > 0 &&
                                        <Button
                                            onPress={() => this.decreaseOrderQuantity(item)}
                                            title={item.quantity > 1 ? 'Less one' : 'Cancel this'}
                                        />}
                                    </View>

                                    {(item.quantity > 0 || item.focused) &&
                                    <View>
                                        <FloatingLabelInput
                                            label={item.name + " Quantity"}
                                            value={item.quantityText}
                                            onChangeText={text => this.changeQuantity(item, text)}
                                            onFocus={() => this.handleFocus(item)}
                                            onBlur={() => this.handleBlur(item)}
                                        />
                                    </View>
                                    }
                                </View>
                            </>
                        )}
                    />
                </KeyboardAvoidingView>


                <View style={{marginBottom: 95}}/>

                <View style={styles.tabBarInfoContainer}>
                    {/*<Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>*/}


                    <View style={{flexDirection: 'row'}}>
                        <Button
                            title='全部'
                            onPress={() => this.filterByKind('')}
                        />
                        <View style={{padding: 5}}/>
                        <Button
                            title='牛肉'
                            onPress={() => this.filterByKind('牛肉')}
                        />
                        <View style={{padding: 5}}/>
                        <Button
                            title='猪肉'
                            onPress={() => this.filterByKind('猪肉')}
                        />
                        <View style={{padding: 5}}/>
                        <Button
                            title='鸡肉'
                            onPress={() => this.filterByKind('鸡肉')}
                        />
                        <View style={{padding: 5}}/>
                        <Button
                            title='海鲜'
                            onPress={() => this.filterByKind('海鲜')}
                        />
                        <View style={{padding: 5}}/>
                        <Button
                            title='点心'
                            onPress={() => this.filterByKind('点心')}
                        />
                    </View>

                    <View style={{paddingTop: 5}}>
                        <Button
                            title={'Copy order to clipboard'}
                            style={{padding: 10}}
                            onPress={() => this.sort()}
                        />
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

