import { useState } from 'react';
import { getProfile } from '../services/profile.service';

const Home = () => {
  const [profileData, setProfileData] = useState(null);

  const handleGetProfile = async () => {
    const data = await getProfile();
    console.log('Respuesta backend:', data);
    if (data && typeof data === 'object') {
      // Si la respuesta tiene userData, lo expandimos; si no, mostramos todo el objeto
      if (data.userData) {
        setProfileData({
          message: data.message,
          ...data.userData
        });
      } else {
        setProfileData(data);
      }
    } else {
      setProfileData({ error: 'No se pudo obtener el perfil' });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>
        
        <button 
          onClick={handleGetProfile} 
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Obtener Perfil
        </button>

        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            {profileData.error ? (
              <p className="text-red-600 font-semibold">{profileData.error}</p>
            ) : (
              <>
                {profileData.message && (
                  <p className="text-red-600 font-semibold mb-4">{profileData.message}</p>
                )}
                {profileData.data && profileData.data.userData && (
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md border-2 border-purple-300 flex flex-col items-start gap-4">
                      <p className="text-2xl font-bold text-purple-700 mb-2">Datos del usuario</p>
                      <div className="w-full flex flex-col gap-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Email</span>
                          <span className="text-lg font-semibold text-gray-800 bg-purple-50 rounded px-2 py-1">{profileData.data.userData.email}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Password (encriptada)</span>
                          <span className="text-lg font-mono text-gray-700 bg-purple-50 rounded px-2 py-1 break-all">{profileData.data.userData.password ?? 'No disponible'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
