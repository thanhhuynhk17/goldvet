import { getPayload } from 'payload'
import configPromise from '@payload-config'

async function updateHomePageLogo() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Update the home page to use the correct logo (ID 9: DSC09433-2.jpg)
    const result = await payload.update({
      collection: 'pages',
      id: 4, // Home page ID from your API response
      data: {
        meta: {
          image: 9, // Use the correct logo ID (DSC09433-2.jpg)
          title: "Trang chủ | Thuốc thú y Gold Vet - Vững bước chăn nuôi",
          description: "An open-source ecommerce site built with Payload and Next.js. An open-source ecommerce site built with Payload and Next.js."
        }
      }
    })

    console.log('✅ Home page logo updated successfully!')
    console.log('New logo:', result.meta?.image)

  } catch (error) {
    console.error('❌ Error updating logo:', error)
  } finally {
    process.exit(0)
  }
}

updateHomePageLogo()
