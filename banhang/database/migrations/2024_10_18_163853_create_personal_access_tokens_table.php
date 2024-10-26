<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalAccessTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id(); // Khóa chính tự động tăng
            $table->string('tokenable_type'); // Loại đối tượng
            $table->foreignId('tokenable_id'); // ID của đối tượng
            $table->string('name'); // Tên của token
            $table->text('token'); // Giá trị token
            $table->json('abilities')->nullable(); // Quyền hạn (nếu có)
            $table->timestamp('last_used_at')->nullable(); // Thời gian sử dụng cuối
            $table->timestamp('expires_at')->nullable(); // Thời gian hết hạn
            $table->timestamps(); // Thời gian tạo và cập nhật

            $table->unique('token'); // Đảm bảo tính duy nhất cho token
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_access_tokens');
    }
}
