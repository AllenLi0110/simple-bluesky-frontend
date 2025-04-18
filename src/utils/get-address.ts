import axios from 'axios'

export const getAddressFromCoordinates = async (lat: number, lng: number) => {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`

  try {
    const response = await axios.get(url)
    if (response.data && response.data.address) {
      const { road, suburb, city, country } = response.data.address
      const addressComponents = [road, suburb, city, country].filter(Boolean)
      return addressComponents.join(', ')
    }
    return 'Unknown Location'
  } catch (error) {
    console.error('Error getting address from coordinates:', error)
    return 'Unknown Location'
  }
}
