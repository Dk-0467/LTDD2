<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Lấy tất cả danh mục
    public function indexUser()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    // Lấy danh mục theo ID và sản phẩm thuộc danh mục đó
    public function show($id)
    {
        // Tìm danh mục theo ID
        $category = Category::with('products')->find($id); // Sử dụng with để eager load sản phẩm

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        return response()->json([
            'category' => $category,
            'products' => $category->products, // Trả về danh sách sản phẩm thuộc danh mục
        ]);
    }

    // Tạo danh mục mới
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data = $request->all();

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/category'), $imageName);
            $data['image'] = $imageName;
        }
        $category = Category::create($data);

        return response()->json(['message' => 'Category created successfully.', 'category' => $category], 201);
    }

    public function update(Request $request, $id)
    {
        // Tìm danh mục theo ID
        $category = Category::find($id);
        
        // Kiểm tra xem danh mục có tồn tại không
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        // Xác thực dữ liệu
        $request->validate([
            'name' => 'nullable|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Tạo mảng để lưu trữ dữ liệu cập nhật
        $data = $request->only(['name', 'description']); // Lấy các trường cần thiết
    
        // Kiểm tra và cập nhật ảnh nếu có
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu có
            if ($category->image) {
                $oldImagePath = public_path('images/category/' . $category->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath); // Xóa ảnh cũ
                }
            }
    
            // Lưu ảnh mới
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images/category'), $imageName);
            $data['image'] = $imageName; // Cập nhật đường dẫn ảnh
        }
    
        // Cập nhật danh mục với dữ liệu mới
        $category->update($data);
    
        return response()->json(['message' => 'Category updated successfully.', 'category' => $category], 200);
    }
    
        
    // Xóa danh mục
    public function destroy($id)
    {
        $category = Category::find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully.']);
    }
}
