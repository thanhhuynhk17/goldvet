'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface ProductFiltersProps {
  initialFilters: {
    animalType?: string
    formulation?: string
    productType?: string
    searchValue?: string
  }
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({ initialFilters }) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(initialFilters.searchValue || '')

  const updateFilters = (key: string, value: string) => {
    const url = new URL(window.location.href)
    if (value) {
      url.searchParams.set(key, value)
    } else {
      url.searchParams.delete(key)
    }
    router.push(url.pathname + url.search)
  }

  const handleSearch = () => {
    updateFilters('q', searchInput)
  }

  const clearFilters = () => {
    router.push('/san-pham')
  }

  const hasActiveFilters = initialFilters.animalType || initialFilters.formulation || initialFilters.productType || initialFilters.searchValue

  return (
    <div className="mb-8 bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Lọc sản phẩm</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Loại vật nuôi</label>
          <select
            className="w-full p-2 border rounded-md"
            value={initialFilters.animalType || ''}
            onChange={(e) => updateFilters('animalType', e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="pig">Heo (Pig)</option>
            <option value="poultry">Gia cầm (Poultry)</option>
            <option value="cattle">Trâu bò (Cattle)</option>
            <option value="aquaculture">Tôm cá (Aquaculture)</option>
            <option value="pets">Thú cưng (Pets)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dạng bào chế</label>
          <select
            className="w-full p-2 border rounded-md"
            value={initialFilters.formulation || ''}
            onChange={(e) => updateFilters('formulation', e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="injection">Dạng tiêm (Injection)</option>
            <option value="solution">Dạng dung dịch (Solution)</option>
            <option value="powder">Dạng bột (Powder)</option>
            <option value="tablets">Dạng viên (Tablets)</option>
            <option value="external">Dạng dùng ngoài (External)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Loại sản phẩm</label>
          <select
            className="w-full p-2 border rounded-md"
            value={initialFilters.productType || ''}
            onChange={(e) => updateFilters('productType', e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="vaccine">Vaccine</option>
            <option value="medication">Thuốc thú y (Medication)</option>
            <option value="supplement">Hỗ trợ điều trị (Supplement)</option>
            <option value="parasitic">Ký sinh trùng (Parasitic)</option>
            <option value="support">Bổ trợ (Support)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tìm kiếm</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Tên sản phẩm..."
              className="flex-1 p-2 border rounded-md"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Tìm
            </button>
          </div>
        </div>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="text-green-600 hover:text-green-800 underline"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </div>
  )
}
