# Thẻ hiển thị Sản Lượng và Thành Tiền theo từng Bậc giá điện của EVN Việt Nam


## Hướng dẫn:
1. Cài qua HACS
   - Vào HACS
   - Vào 3 Chấm góc trên bên phải
   - Chọn **Custom repositories**
     
     <img width="303" height="437" alt="image" src="https://github.com/user-attachments/assets/71489d94-bc79-4f12-9941-9c1ce56152e8" />

   - Điền `https://github.com/khaisilk1910/evnvn-electricity-consumption-card` và chọn Dashboard và nhấn Add
     
     <img width="433" height="487" alt="image" src="https://github.com/user-attachments/assets/755a49cb-58a6-481d-b6ad-650017615e86" />

   - Quay lại HACS và nhập ô tìm kiếm `Lịch Block Âm Dương Việt Nam` và Tải về
     
     <img width="1658" height="326" alt="image" src="https://github.com/user-attachments/assets/70917f4b-5ff1-4bd6-b4f9-6e1e9acd4d86" />
     
   - Tải file ảnh hình nền:
      - Truy cập: `https://github.com/khaisilk1910/lich-block-am-duong-viet-nam/tree/main/images`
        
      - Tải tất cả các ảnh trong thư mục `images` về máy
        
      - Tạo mới folder `images` trong `\config\www\community\lich-block-am-duong-viet-nam\` và dán tất cả các file ảnh vào thư mục `images`
        <img width="1063" height="242" alt="image" src="https://github.com/user-attachments/assets/6546c7f0-b80e-4798-a773-76dfb384d019" />
        <img width="1255" height="284" alt="image" src="https://github.com/user-attachments/assets/1a16e47a-9a9e-408e-b90b-b63ca520500d" />
        
   - Sau đó quay trở lại Dashboard mà bạn muốn thêm một thẻ mới.
     
   - Vào Edit Dashboard
     
     <img width="172" height="110" alt="image" src="https://github.com/user-attachments/assets/2447c0e3-0b85-4351-a8ed-51643e3e766c" />
     
   - Thêm thẻ mới và điền
     ```
     type: custom:custom-electric-bill-card-total-days
     entity: sensor.tongou_bo_energy_monthly
     title: Công tơ Bố
     used_days: 15
     prices:
       - 1984 #Giá bậc 1
       - 2050 #Giá bậc 2
       - 2380 #Giá bậc 3
       - 2998 #Giá bậc 4
       - 3350 #Giá bậc 5
       - 3460 #Giá bậc 6
      ```
     <img width="1025" height="764" alt="image" src="https://github.com/user-attachments/assets/25ff473f-812d-4c6d-94d1-8a3b4f9ed4bc" />
