'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Search, Filter, ChevronRight, Star } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/actions/products';
import { cn } from '@/utilities/cn';
import type { Product } from '@/payload-types';

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
      staggerChildren: 0.1
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

interface StoreLayoutBlockProps {
  title?: string;
  subtitle?: string;
  displayFilters?: boolean;
  enableSearch?: boolean;
  showRatings?: boolean;
  itemsPerPage?: number;
  sortBy?: string;
}

export function StoreLayoutBlock({
  title = 'Sản phẩm',
  subtitle = 'Giải pháp dược phẩm thú y toàn diện',
  displayFilters = true,
  enableSearch = true,
  showRatings = true,
  itemsPerPage = 12,
  sortBy = 'createdAt'
}: StoreLayoutBlockProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load initial products
  React.useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        const result = await getProducts({
          limit: itemsPerPage,
          sort: sortBy
        });
        setProducts(result.docs);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };

    loadInitialProducts();
  }, [itemsPerPage, sortBy]);

  // Update URL without causing navigation
  const updateURL = (filters: {
    animalType?: string;
    formulation?: string;
    productType?: string;
    searchValue?: string;
  }) => {
    const url = new URL(window.location.href);

    if (filters.animalType) {
      url.searchParams.set('animalType', filters.animalType);
    } else {
      url.searchParams.delete('animalType');
    }

    if (filters.formulation) {
      url.searchParams.set('formulation', filters.formulation);
    } else {
      url.searchParams.delete('formulation');
    }

    if (filters.productType) {
      url.searchParams.set('productType', filters.productType);
    } else {
      url.searchParams.delete('productType');
    }

    if (filters.searchValue) {
      url.searchParams.set('q', filters.searchValue);
    } else {
      url.searchParams.delete('q');
    }

    window.history.pushState({}, '', url.pathname + url.search);
  };

  // Fetch products with current filters
  const fetchProducts = async (filters: {
    animalType?: string;
    formulation?: string;
    productType?: string;
    searchValue?: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await getProducts({
        animalType: filters.animalType,
        formulation: filters.formulation,
        productType: filters.productType,
        searchValue: filters.searchValue,
        limit: itemsPerPage,
        sort: sortBy
      });
      setProducts(result.docs);
      updateURL(filters);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter changes
  const handleCategoryChange = (category: string | null) => {
    const newFilters = {
      animalType: selectedAnimal || undefined,
      formulation: selectedType || undefined,
      productType: category || undefined,
      searchValue: searchQuery
    };
    setSelectedCategory(category);
    fetchProducts(newFilters);
  };

  const handleAnimalChange = (animal: string | null) => {
    const newFilters = {
      animalType: animal || undefined,
      formulation: selectedType || undefined,
      productType: selectedCategory || undefined,
      searchValue: searchQuery
    };
    setSelectedAnimal(animal);
    fetchProducts(newFilters);
  };

  const handleTypeChange = (type: string | null) => {
    const newFilters = {
      animalType: selectedAnimal || undefined,
      formulation: type || undefined,
      productType: selectedCategory || undefined,
      searchValue: searchQuery
    };
    setSelectedType(type);
    fetchProducts(newFilters);
  };

  const handleSearch = () => {
    const newFilters = {
      animalType: selectedAnimal || undefined,
      formulation: selectedType || undefined,
      productType: selectedCategory || undefined,
      searchValue: searchQuery
    };
    fetchProducts(newFilters);
  };

  const clearFilters = () => {
    const newFilters = {
      animalType: undefined,
      formulation: undefined,
      productType: undefined,
      searchValue: undefined
    };
    setSelectedCategory(null);
    setSelectedAnimal(null);
    setSelectedType(null);
    setSearchQuery('');
    fetchProducts(newFilters);
  };

  const activeFilters = [selectedCategory, selectedAnimal, selectedType].filter(Boolean).length;

  // Get unique categories from products for filter options
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.productType).filter(Boolean)));
    return uniqueCategories;
  }, [products]);

  const animals = useMemo(() => {
    const uniqueAnimals = Array.from(new Set(products.map(p => p.animalType).filter(Boolean)));
    return uniqueAnimals;
  }, [products]);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(products.map(p => p.formulation).filter(Boolean)));
    return uniqueTypes;
  }, [products]);

  if (initialLoad) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mb-8"
        >
          <div className="relative mb-6">
            {enableSearch && (
              <>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </>
            )}
          </div>

          {displayFilters && activeFilters > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 mb-4"
            >
              <Filter className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">{activeFilters} bộ lọc đang hoạt động</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-green-600 hover:text-green-700"
              >
                Xóa tất cả
              </Button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {displayFilters && (
            <motion.aside
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-1"
            >
              <div className="sticky top-20 space-y-6 bg-white p-6 rounded-2xl shadow-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-green-600" />
                    Danh mục
                  </h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => handleCategoryChange(null)}
                      className={cn(
                        'w-full text-left px-4 py-2 rounded-lg transition-all',
                        !selectedCategory
                          ? 'bg-green-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-green-50'
                      )}
                    >
                      Tất cả
                    </motion.button>
                    {categories.map((cat) => (
                      <motion.button
                        key={cat}
                        whileHover={{ x: 4 }}
                        onClick={() => handleCategoryChange(selectedCategory === cat ? null : cat)}
                        className={cn(
                          'w-full text-left px-4 py-2 rounded-lg transition-all',
                          selectedCategory === cat
                            ? 'bg-green-600 text-white font-semibold'
                            : 'text-gray-700 hover:bg-green-50'
                        )}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Loài động vật</h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => handleAnimalChange(null)}
                      className={cn(
                        'w-full text-left px-4 py-2 rounded-lg transition-all',
                        !selectedAnimal
                          ? 'bg-green-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-green-50'
                      )}
                    >
                      Tất cả
                    </motion.button>
                    {animals.map((animal) => (
                      <motion.button
                        key={animal}
                        whileHover={{ x: 4 }}
                        onClick={() => handleAnimalChange(selectedAnimal === animal ? null : animal)}
                        className={cn(
                          'w-full text-left px-4 py-2 rounded-lg transition-all',
                          selectedAnimal === animal
                            ? 'bg-green-600 text-white font-semibold'
                            : 'text-gray-700 hover:bg-green-50'
                        )}
                      >
                        {animal}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dạng bào chế</h3>
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => handleTypeChange(null)}
                      className={cn(
                        'w-full text-left px-4 py-2 rounded-lg transition-all',
                        !selectedType
                          ? 'bg-green-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-green-50'
                      )}
                    >
                      Tất cả
                    </motion.button>
                    {types.map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ x: 4 }}
                        onClick={() => handleTypeChange(selectedType === type ? null : type)}
                        className={cn(
                          'w-full text-left px-4 py-2 rounded-lg transition-all',
                          selectedType === type
                            ? 'bg-green-600 text-white font-semibold'
                            : 'text-gray-700 hover:bg-green-50'
                        )}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className={displayFilters ? "lg:col-span-3" : "lg:col-span-4"}
          >
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      {(() => {
                        const image =
                          product.gallery?.[0]?.image && typeof product.gallery[0]?.image !== 'string'
                            ? product.gallery[0]?.image
                            : false
                        return image ? (
                          <img
                            src={(image as any)?.url || ''}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : null
                      })()}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Xem chi tiết
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                            {product.productType || 'Sản phẩm'}
                          </p>
                          <h3 className="text-lg font-bold text-gray-900 mt-2 line-clamp-2">
                            {product.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {typeof product.description === 'string'
                          ? product.description
                          : 'Mô tả sản phẩm'}
                      </p>

                      {showRatings && (
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4 // Mock 4-star rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">4.8</span>
                        </div>
                      )}

                      <div className="flex gap-2 flex-wrap">
                        {product.animalType && (
                          <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {product.animalType}
                          </span>
                        )}
                        {product.formulation && (
                          <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
                            {product.formulation}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600 mb-6">
                  Thử thay đổi các bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button onClick={clearFilters} className="bg-green-600 hover:bg-green-700">
                  Xóa tất cả bộ lọc
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-12 rounded-2xl border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Không tìm thấy sản phẩm bạn cần?
            </h3>
            <p className="text-gray-600 mb-6">
              Liên hệ với chúng tôi để được tư vấn về các sản phẩm đặc biệt
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
                Liên hệ ngay
              </Button>
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8">
                Tải bảng giá
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
