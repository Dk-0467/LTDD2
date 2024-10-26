import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { getCategoryWithProductsById } from '../api/apiService'; // Import hàm lấy sản phẩm theo categoryId
import ProductItem from './hometabs/items/ItemsProduct'; // Import component ProductItem
import { useNavigation } from '@react-navigation/native'; // Import useNavigation để điều hướng

const CategoryProductsScreen = ({route}: {route: any}) => {
    const { categoryId } = route.params; // Lấy categoryId từ params
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Khai báo useNavigation

    useEffect(() => {
        const fetchCategoryWithProducts = async () => {
            try {
                const categoryData = await getCategoryWithProductsById(categoryId); // Lấy danh mục và sản phẩm theo ID
                setCategory(categoryData);
            } catch (error) {
                console.error('Error fetching category with products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryWithProducts();
    }, [categoryId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6b4226" />
            </View>
        ); // Hiển thị loading khi đang tải dữ liệu
    }

    if (!category || !category.products || category.products.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Không có sản phẩm nào trong danh mục này.</Text>
            </View>
        ); // Hiển thị thông báo nếu không có sản phẩm
    }

    return (
        <View style={styles.container}>
            <Text style={styles.categoryTitle}>{category.name}</Text> {/* Hiển thị tên danh mục */}
            <FlatList
                data={category.products} // Sử dụng sản phẩm từ danh mục
                renderItem={({ item }) => (
                    <ProductItem
                        item={item}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer} // Thêm style cho FlatList
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10, // Thêm padding cho container
        backgroundColor: '#fff', // Màu nền trắng cho giao diện
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center', // Canh giữa theo chiều dọc
        alignItems: 'center', // Canh giữa theo chiều ngang
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center', // Canh giữa theo chiều dọc
        alignItems: 'center', // Canh giữa theo chiều ngang
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#6b4226', // Màu sắc tương tự với giao diện
        textAlign: 'center',
    },
    categoryTitle: {
        fontSize: 24, // Kích thước chữ cho tên danh mục
        fontWeight: 'bold', // Làm đậm chữ
        color: '#6b4226', // Màu sắc cho tiêu đề
        marginBottom: 10, // Khoảng cách dưới tiêu đề
        textAlign: 'center', // Canh giữa
    },
    listContainer: {
        paddingBottom: 20, // Thêm padding dưới cùng
    },
});

export default CategoryProductsScreen; 
