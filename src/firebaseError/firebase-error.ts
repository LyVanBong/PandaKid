export const firebaseError = (error: any) => {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'Email đã được sử dụng!';
    case 'auth/invalid-email':
      return 'Email không tồn tại !';
    case 'auth/invalid-phone-number':
      return 'Số điện thoại không hợp lệ';
    case 'auth/wrong-password':
      return 'Tên đăng nhập hoặc mật khẩu không đúng';
    case 'auth/invalid-verification-code':
      return 'Mã xác nhận không hợp lệ';
    case 'auth/weak-password':
      return 'Mật khẩu không đủ mạnh';
    case 'auth/too-many-requests':
      return 'Tài khoản đã bị khoá.Xin thử lại sau';

    default:
      return 'Lỗi hệ thống xin vui lòng thử lại sau';
  }
};
