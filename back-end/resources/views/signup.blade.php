<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
 <body class="bg-[#fff9fa] min-h-screen flex items-center justify-center relative overflow-hidden">

    <img src="{{ Vite::asset('resources/images/Leftdecoration.png') }}" alt="left decoration" class="absolute left-0 top-20 w-[60px] opacity-80" />
    <img src="{{ Vite::asset('resources/images/bungabg.png') }}" alt="bunga kanan" class="absolute right-[20%] top-[25%] w-[120px] opacity-60" />
    <img src="{{ Vite::asset('resources/images/bungabg.png') }}" alt="bunga kiri" class="absolute left-[15%] bottom-[20%] w-[100px] opacity-60" />
    <img src="{{ Vite::asset('resources/images/star.png') }}" alt="bintang" class="absolute left-[45%] top-[15%] w-[40px] opacity-70" />
    <img src="{{ Vite::asset('resources/images/star.png') }}" alt="bintang" class="absolute right-[10%] bottom-[25%] w-[35px] opacity-70" />

    <div class="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
      <img src="{{ Vite::asset('resources/images/logomakanan.png') }}" alt="" class="mx-auto w-16 mb-3">
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
          <div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280Z"/>
            </svg>
            <input required type="password" name="password" id="password-input" placeholder="Masukkan password" class="w-full ml-2 focus:outline-none bg-transparent" />
          </div>
        </div>

        <div>
          <label class="text-sm font-medium">Ulangi Password</label>
<div class="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-pink-300">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280Z"/>
            </svg>
            <input required type="password" name="password.confirmation" id="password-confirmation-input" placeholder="Masukkan ulang password" class="w-full ml-2 focus:outline-none bg-transparent" />
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
  </body>
</html>