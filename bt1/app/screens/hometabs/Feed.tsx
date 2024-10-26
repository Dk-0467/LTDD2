import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getCategories, getProducts } from '../../api/apiService'; // Import dịch vụ
import ProductItem from './items/ItemsProduct'; // Import component ProductItem
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon thư viện

const Feed = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Trạng thái để theo dõi việc tải sản phẩm
  const [lastLoadedTime, setLastLoadedTime] = useState(Date.now()); // Thời gian tải sản phẩm cuối cùng

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesData = await getCategories();
        const productsData = await getProducts();
        if (categoriesData && productsData) {
          setCategories(categoriesData);
          setProducts(productsData);
          setLastLoadedTime(Date.now());
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  // Hàm để kiểm tra và tải sản phẩm mới
  const checkForNewProducts = async () => {
    const newProductsData = await getProducts();
    // So sánh với sản phẩm hiện tại
    if (newProductsData.length > products.length) {
      setProducts(newProductsData);
      setLastLoadedTime(Date.now()); // Cập nhật thời gian tải sản phẩm
    }
  };

  // Thiết lập kiểm tra mỗi 10 giây
  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewProducts();
    }, 10000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, [products]);

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard} 
      onPress={() => navigation.navigate('CategoryProducts', { categoryId: item.id })} // Điều hướng đến CategoryProductsScreen
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} /> 
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );
  

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <Text style={styles.menuText}>Menu</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#6b4226" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.promotionContainer}>
        <Text style={styles.promotionTitle}>Promotion</Text>
        <View style={styles.promotionCard}>
          <Image
            source={{ uri: 'https://th.bing.com/th/id/OIP.yYplwOBUXBcahNyZkkRqSgHaE7?rs=1&pid=ImgDetMain' }}
            style={styles.promoImage}
            resizeMode="cover"
          />
          <Text style={styles.promoText}>Free bottle of Coffee Latte</Text>
          <Text style={styles.promoDescription}>on all orders above $ 200.000</Text>
        </View>
      </View>

      <Text style={styles.popularTitle}>Popular</Text>
    </>
  );

  return (
    <>
      {/* Kiểm tra dữ liệu products trước khi render FlatList */}
      {console.log('Products data:', products)}
      
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          />
        )}
        keyExtractor={item => item?.id ? item.id.toString() : Math.random().toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
      />
    </>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6b4226',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30, // Thay đổi độ cong
    paddingHorizontal: 15, // Thay đổi padding
    flex: 1,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10, // Thêm padding để input đẹp hơn
    color: '#6b4226', // Thay đổi màu chữ
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoriesList: {
    paddingVertical: 10, // Thêm padding dọc cho danh sách
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 50, // Giữ hình tròn
    padding: 10, // Padding cho thẻ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Tăng độ cao bóng đổ
    shadowOpacity: 0.4, // Tăng độ mờ bóng đổ
    shadowRadius: 5,
    elevation: 5,
  },
  categoryImage: {
    width: 60, // Kích thước hình ảnh
    height: 60,
    borderRadius: 40, // Giữ hình tròn cho hình ảnh
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold', // Thay đổi kiểu chữ
    color: '#6b4226',
    textAlign: 'center', // Canh giữa tên danh mục
  },  
  promotionContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  promotionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6b4226',
    marginBottom: 10,
  },
  promotionCard: {
    backgroundColor: '#ffe5d9',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  promoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b4226',
  },
  promoDescription: {
    fontSize: 14,
    color: '#6b4226',
  },
  popularTitle: {
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6b4226',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default Feed;
