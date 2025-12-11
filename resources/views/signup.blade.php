<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
 <body class="bg-[#fff9fa] min-h-screen flex items-center justify-center relative overflow-hidden">

    <img src="{{ asset('images/Leftdecoration.png') }}" alt="left decoration" class="absolute left-0 top-20 w-[60px] opacity-80" />
    <img src="{{ asset('images/bungabg.png') }}" alt="bunga kanan" class="absolute right-[20%] top-[25%] w-[120px] opacity-60" />
    <img src="{{ asset('images/bungabg.png') }}" alt="bunga kiri" class="absolute left-[15%] bottom-[20%] w-[100px] opacity-60" />
    <img src="{{ asset('images/star.png') }}" alt="bintang" class="absolute left-[45%] top-[15%] w-[40px] opacity-70" />
    <img src="{{ asset('images/star.png') }}" alt="bintang" class="absolute right-[10%] bottom-[25%] w-[35px] opacity-70" />

    <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
      <img src="{{ asset('images/logomakanan.png') }}" alt="" class="mx-auto w-16 mb-3">
      <h1 class="text-3xl font-bold text-pink-500 text-center mb-2">Welcome!</h1>
      <p class="text-center text-gray-600 mb-6 text-sm">Daftar untuk melanjutkan</p>

      @if ($errors->any())
        <div class="bg-red-100 text-red-700 p-2 rounded mb-4">
            <ul>
              @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
              @endforeach
            </ul>
        </div>
      @endif

      @if(session('success'))
        <div class="bg-green-100 text-green-700 p-2 rounded mb-4">
            {{ session('success') }}
        </div>
      @endif

      <form action="{{ route('register') }}" method="POST" class="space-y-4">
        @csrf
        <div>
          <label class="text-sm font-medium">Username</label>
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/>
            </svg>
            <input required type="text" name="name" id="username-input" placeholder="Masukkan username anda" class="w-full ml-2 focus:outline-none bg-transparent" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium">Email</label>
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200Z"/>
            </svg>
            <input required type="email" name="email" id="email-input" placeholder="Masukkan email anda" class="w-full ml-2 focus:outline-none bg-transparent" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium">Password</label>
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300 relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
            </svg>
            <input required type="password" name="password" id="password-input" placeholder="Masukkan password" class="w-full ml-2 focus:outline-none bg-transparent pr-8" />
            <button type="button" id="toggle-password" class="absolute right-2 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" id="eye-icon">
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label class="text-sm font-medium">Ulangi Password</label>
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300 relative">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
            </svg>
            <input required type="password" name="password_confirmation" id="password-confirmation-input" placeholder="Masukkan ulang password" class="w-full ml-2 focus:outline-none bg-transparent pr-8" />
            <button type="button" id="toggle-password-confirmation" class="absolute right-2 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f" id="eye-icon-confirmation">
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-2 text-sm">
          <input required type="checkbox" id="terms" />
          <label for="terms">Setuju dengan Terms & Conditions</label>
        </div>

        <p class="text-center text-pink-600 mb-6 text-sm">Sudah punya akun? <a href="{{ route('login') }}">Log In</a></p>
        <button class="w-full bg-pink-400 text-white py-2 rounded-lg hover:bg-pink-500 transition">
          Daftar
        </button>
      </form>
    </div>

    <script>
      const togglePassword = document.getElementById('toggle-password');
      const passwordInput = document.getElementById('password-input');
      const eyeIcon = document.getElementById('eye-icon');
      const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>`;
      const eyeClosedSVG = eyeIcon.outerHTML;

      togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.innerHTML = type === 'text' ? eyeOpenSVG : eyeClosedSVG;
      });

      const togglePasswordConfirmation = document.getElementById('toggle-password-confirmation');
      const passwordConfirmationInput = document.getElementById('password-confirmation-input');
      const eyeIconConfirmation = document.getElementById('eye-icon-confirmation');
      const eyeOpenSVGConfirmation = eyeOpenSVG; 
      const eyeClosedSVGConfirmation = eyeIconConfirmation.outerHTML;

      togglePasswordConfirmation.addEventListener('click', () => {
        const type = passwordConfirmationInput.type === 'password' ? 'text' : 'password';
        passwordConfirmationInput.type = type;
        togglePasswordConfirmation.innerHTML = type === 'text' ? eyeOpenSVGConfirmation : eyeClosedSVGConfirmation;
      });
    </script>
  </body>
</html>
