import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {MyColors} from '../constants/MyColors';
import {useQuery} from '@apollo/client';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  GET_INVENTORY_ITEMS_CATEGORIE_INFO,
  GET_ITEMS,
} from '../graphql/graphql';
import {
  GetInventoryItems,
  HomeStackParams,
  InventoryItemsCategorieInfo,
} from '../interfaces/interfaces';
import {BarChart} from 'react-native-gifted-charts';
import RegularText from '../components/RegularText';
import BoldText from '../components/BoldText';
import SemiBoldText from '../components/SemiBoldText';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MButton from '../components/MButton';
import DashboardSkeleton from '../components/skeleton/DashboardSkeleton';
import useRefresh from '../hooks/useRefresh';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/Store';
import Reload from '../components/Reload';

type Props = NativeStackNavigationProp<HomeStackParams, 'Dashboard'>;

const Dashboard = () => {
  const {colors} = useTheme();
  const {categories, maxQuantity, minQuantity} = useSelector(
    (state: RootState) => state.inventoryQuerySlice,
  );

  const {data, loading, refetch, error} =
    useQuery<GetInventoryItems>(GET_ITEMS);

  const totalItems = useMemo(() => data?.inventoryItems?.length ?? 0, [data]);

  const totalValues = useMemo(() => {
    if (!data?.inventoryItems) return 0;
    return data.inventoryItems.reduce((acc, curr) => {
      const costPrice = curr.costPrice ?? 0;
      const quantity = curr.quantity ?? 0;
      return acc + costPrice * quantity;
    }, 0);
  }, [data]);

  const itemsToReorder = useMemo(() => {
    if (!data?.inventoryItems) return [];
    return data.inventoryItems.filter(item => {
      const reorderLevel = item.reorderLevel ?? 0;
      return item.quantity < reorderLevel;
    });
  }, [data]);

  const {refreshing, onRefresh} = useRefresh(refetch);

  if (loading) return <DashboardSkeleton />;
  if (error) <Reload callback={refetch} />;
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Header color={colors.text} />

      <BoldText style={[styles.headingText, {color: colors.text}]}>
        Dashboard
      </BoldText>

      <View style={styles.cardContainer}>
        <Card heading="Total Items" value={totalItems} />
        <Card heading="Total Value" value={`$${totalValues}`} />
        <Card heading="Reorder Items" value={itemsToReorder?.length} />
      </View>

      <InventoryItem />

      <InventoryChart />
    </ScrollView>
  );
};

export default Dashboard;

const Header = ({color}: {color: string}) => {
  const navigation = useNavigation<Props>();
  const {user} = useSelector((state: RootState) => state.authSlice);
  return (
    <View style={styles.headerContainer}>
      <View>
        <BoldText style={[styles.welcomeText, {color}]}>Welcome</BoldText>
        <SemiBoldText style={styles.userNameText}>
          {user?.fullname}
        </SemiBoldText>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons
          name="settings"
          size={22}
          color={'black'}
          style={styles.settingIcon}
        />
      </TouchableOpacity>
    </View>
  );
};
const InventoryItem = () => {
  const navigation = useNavigation<Props>();
  return (
    <TouchableOpacity
      style={styles.inventoryContainer}
      onPress={() => navigation.navigate('Home')}>
      <View style={styles.inventoryContentContainer}>
        <Ionicons name="cube" size={25} color={MyColors.primaryColor} />
        <SemiBoldText style={styles.inventoryText}>
          Inventory Items
        </SemiBoldText>
      </View>
      <Ionicons
        name="arrow-forward"
        size={25}
        color={MyColors.primaryColor}
        style={styles.inventoryArrowIcon}
      />
    </TouchableOpacity>
  );
};

const InventoryChart = () => {
  const {data: categorieInfo} = useQuery<InventoryItemsCategorieInfo>(
    GET_INVENTORY_ITEMS_CATEGORIE_INFO,
  );
  const chartColors = [
    '#e36414',
    '#f77f00',
    '#fcbf49',
    '#e29578',
    '#e09f3e',
    '#ffc300',
  ];

  const {colors} = useTheme();
  const {width} = Dimensions.get('screen');
  const chartData = useMemo(
    () =>
      categorieInfo?.inventoryItemsCategoriesInfo.map((item, index) => {
        return {value: item.totalItems, frontColor: chartColors[index]};
      }),
    [categorieInfo],
  );
  return (
    <View style={{marginBottom: 15}}>
      <Text style={[styles.headingText, {color: colors.text}]}>
        Top Categories
      </Text>

      <View style={[styles.categorieContainer, {backgroundColor: colors.card}]}>
        <View style={styles.categorieHeading}>
          {categorieInfo?.inventoryItemsCategoriesInfo.map((info, index) => (
            <Category
              color={colors.text}
              key={info.categoryName}
              bgColor={chartColors[index]}
              categorie={info.categoryName}
              totalItems={info.totalItems}
            />
          ))}
        </View>

        <View style={{width: '100%', flex: 1}}>
          <BarChart
            width={width - 10}
            barWidth={22}
            barBorderRadius={0}
            data={chartData}
            dashWidth={0}
            animationDuration={150}
            isAnimated
            yAxisThickness={0}
            xAxisThickness={0}
            roundedBottom={false}
            barBorderTopLeftRadius={2}
            barBorderTopRightRadius={2}
            yAxisTextStyle={[
              {color: MyColors.primaryColor, fontWeight: 'bold'},
            ]}
          />
        </View>
      </View>
    </View>
  );
};
interface CategorieProps {
  categorie: string;
  totalItems: number;
  bgColor: string;
  color: string;
}
const Category = ({categorie, totalItems, bgColor, color}: CategorieProps) => {
  return (
    <View style={styles.categorieCom}>
      <View style={styles.categorieComHeading}>
        <View style={{width: 16, height: 16, backgroundColor: bgColor}} />
        <RegularText style={[{color}]}>{categorie}</RegularText>
      </View>
      <BoldText style={[styles.categorieCountText, {color}]}>
        {totalItems}
      </BoldText>
    </View>
  );
};

interface CardProps {
  heading: string;
  value: string | number;
}
const Card = ({heading, value}: CardProps) => {
  return (
    <View style={styles.card}>
      <RegularText style={styles.cardHeadingText}>{heading}</RegularText>
      <BoldText style={styles.cardInfoText}>{value}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginBottom: 10,
  },
  welcomeText: {},
  userNameText: {
    fontSize: 15,
    fontWeight: '500',
    color: MyColors.primaryColor,
  },
  headingText: {
    fontSize: 21,
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardContainer: {
    flexDirection: 'row',
    gap: 10,
    flex: 1,
    marginVertical: 15,
    flexWrap: 'wrap',
  },
  card: {
    padding: 15,
    backgroundColor: MyColors.secondaryColor,
    alignSelf: 'flex-start',
    elevation: 2,
    borderRadius: 10,
  },
  cardHeadingText: {
    fontSize: 15,
    color: 'black',
  },

  cardInfoText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },

  categorieContainer: {
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 1,
    marginTop: 15,
  },
  categorieHeading: {gap: 10, paddingVertical: 15},
  categorieCom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categorieComHeading: {flexDirection: 'row', alignItems: 'center', gap: 18},
  categorieCountText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 15,
  },
  inventoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#cecece',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 5,
    marginBottom: 15,
  },
  inventoryContentContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  inventoryText: {fontSize: 16, textTransform: 'uppercase', color: 'black'},
  inventoryArrowIcon: {
    backgroundColor: MyColors.secondaryColor,
    padding: 5,
    borderRadius: 50,
    transform: [{rotate: '-45deg'}],
  },
  settingIcon: {
    backgroundColor: 'lightgray',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 10,
    marginTop: 3,
  },
});
