'use client';

import { motion, Variants } from 'framer-motion';
import { ChevronRight, Share2, Heart, ShoppingCart, Phone, MessageCircle, Check, AlertCircle, Info, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Product, Media } from '@/payload-types';
import { AddToCart } from '@/components/Cart/AddToCart';
import { Price } from '@/components/Price';
import { useCurrency } from '@payloadcms/plugin-ecommerce/client/react';
import Link from 'next/link';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

interface ProductDetailProps {
  product: Product;
}

export default function VinavetcoProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { currency } = useCurrency();

  // Get product images from gallery
  const gallery = product.gallery
    ?.filter((item) => typeof item.image === 'object')
    .map((item) => item.image as Media) || [];

  // Get price information
  let price = 0;
  const priceField = `priceIn${currency.code}` as keyof Product;
  if (product[priceField] && typeof product[priceField] === 'number') {
    price = product[priceField] as number;
  }

  // Check stock status
  const hasStock = product.enableVariants
    ? product?.variants?.docs?.some((variant) => {
        if (typeof variant !== 'object') return false;
        return variant.inventory && variant?.inventory > 0;
      })
    : product.inventory! > 0;

  // Get related products
  const relatedProducts = product.relatedProducts
    ?.filter((relatedProduct) => typeof relatedProduct === 'object')
    .slice(0, 4) as Product[] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-center gap-2 text-gray-600 text-sm mb-8"
        >
          <Link href="/" className="hover:text-green-600">Trang chủ</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/cua-hang" className="hover:text-green-600">Sản phẩm</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-green-600 font-semibold">{product.title}</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl sticky top-32">
              <div className="relative h-96 bg-gray-100 flex items-center justify-center overflow-hidden group">
                {gallery[selectedImage] ? (
                  <img
                    src={gallery[selectedImage].url!}
                    alt={gallery[selectedImage].alt || product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="text-gray-400">No image available</div>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                    }`}
                  />
                </motion.button>
              </div>

              <div className="p-4 border-t flex gap-2 overflow-x-auto">
                {gallery.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-green-600 shadow-lg'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={image.url!} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            <div>
              <p className="text-green-600 text-sm font-semibold uppercase tracking-wide mb-2">
                {product.productType && typeof product.productType === 'string'
                  ? product.productType.charAt(0).toUpperCase() + product.productType.slice(1)
                  : 'Medicines'}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
              <p className="text-gray-600 text-lg mb-4">
                Thương hiệu: <span className="font-semibold text-gray-900">VINAVETCO</span>
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">4.8</span>
                <span className="text-gray-600">(156 đánh giá)</span>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200 mb-6">
                <p className="text-gray-600 text-sm mb-2">Giá</p>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  <Price amount={price} />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  {hasStock ? (
                    <>
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 font-semibold">Còn hàng</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 font-semibold">Hết hàng</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-semibold">Số lượng:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-l border-r border-gray-300 py-2"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <AddToCart product={product} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 border-2 border-green-600 rounded-lg text-green-600 font-semibold hover:bg-green-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 mb-3">Liên hệ với chúng tôi</h3>
                <motion.a
                  whileHover={{ x: 4 }}
                  href="tel:+84123456789"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Gọi điện</p>
                    <p className="text-sm text-gray-600">+84 (0) 123 456 789</p>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
                  href="#"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Zalo / Messenger</p>
                    <p className="text-sm text-gray-600">Nhắn tin để được tư vấn</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="description">Mô tả</TabsTrigger>
              <TabsTrigger value="dosage">Liều lượng</TabsTrigger>
              <TabsTrigger value="specifications">Thông số</TabsTrigger>
              <TabsTrigger value="precautions">Lưu ý</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              {product.indications && product.indications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Chỉ định</h3>
                  <ul className="space-y-3">
                    {product.indications.map((indication, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex gap-3 text-gray-700"
                      >
                        <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span>{indication.indication}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thành phần chính</h3>
                  <div className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        variants={scaleIn}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <span className="font-semibold text-gray-900">{ingredient.name}</span>
                        <span className="text-green-600 font-bold">{ingredient.percentage}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {(product.certificate || product.registration) && (
                <div className="border-t pt-6 bg-blue-50 p-6 rounded-xl">
                  <div className="flex gap-3">
                    <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-2">Thông tin bổ sung</p>
                      {product.certificate && <p className="text-sm text-blue-800">{product.certificate}</p>}
                      {product.registration && <p className="text-sm text-blue-800">{product.registration}</p>}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="dosage" className="space-y-6">
              {product.dosage && product.dosage.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Liều lượng sử dụng</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-green-50 border-b-2 border-green-200">
                          <th className="p-4 text-left font-semibold text-gray-900">Loài động vật</th>
                          <th className="p-4 text-left font-semibold text-gray-900">Liều lượng</th>
                          <th className="p-4 text-left font-semibold text-gray-900">Thời gian</th>
                          <th className="p-4 text-left font-semibold text-gray-900">Ghi chú</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.dosage.map((dose, index) => (
                          <motion.tr
                            key={index}
                            variants={fadeInUp}
                            className="border-b hover:bg-gray-50 transition-colors"
                          >
                            <td className="p-4 font-semibold text-gray-900">{dose.species}</td>
                            <td className="p-4 text-gray-700">{dose.dose}</td>
                            <td className="p-4 text-gray-700">{dose.duration}</td>
                            <td className="p-4 text-gray-700">{dose.notes}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: 'Chất hoạt động', value: product.activeIngredient },
                  { label: 'Hàm lượng', value: product.concentration },
                  { label: 'Dạng bào chế', value: product.pharmaceuticalForm },
                  { label: 'Hình trạng', value: product.appearance },
                  { label: 'Đóng gói', value: product.packing },
                  { label: 'Hạn sử dụng', value: product.shelfLife },
                ].filter(spec => spec.value).map((spec, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <p className="text-sm text-gray-600 font-semibold mb-2">{spec.label}</p>
                    <p className="text-gray-900 font-bold">{spec.value}</p>
                  </motion.div>
                ))}
              </div>

              {product.storageConditions && (
                <div className="mt-6 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-gray-600 mb-2">Điều kiện bảo quản</p>
                  <p className="text-gray-900">{product.storageConditions}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="precautions" className="space-y-6">
              {product.contraindications && product.contraindications.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    Chống chỉ định
                  </h3>
                  <ul className="space-y-3">
                    {product.contraindications.map((contra, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex gap-3 text-gray-700 p-3 bg-red-50 rounded-lg border border-red-200"
                      >
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <span>{contra.contraindication}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {product.sideEffects && product.sideEffects.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tác dụng phụ</h3>
                  <ul className="space-y-2">
                    {product.sideEffects.map((effect, index) => (
                      <motion.li
                        key={index}
                        variants={fadeInUp}
                        className="flex gap-3 text-gray-700"
                      >
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>{effect.effect}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  variants={scaleIn}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group"
                >
                  <Link href={`/cua-hang/${relatedProduct.slug}`}>
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {relatedProduct.meta?.image && typeof relatedProduct.meta.image === 'object' ? (
                        <img
                          src={(relatedProduct.meta.image as Media).url!}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-2">{relatedProduct.title}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`text-sm ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </div>
                        ))}
                        <span className="text-xs text-gray-600 ml-2">4.5</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
