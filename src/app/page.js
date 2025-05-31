'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from '../components/ProductGrid';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import { products } from '../data/product';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const brands = [...new Set(products.map(product => product.brand).filter(Boolean))];

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const searchParam = searchParams.get('search');
    const brandParam = searchParams.get('brand');

    if (categoryParam) setSelectedCategory(categoryParam);
    if (priceParam) {
      const [min, max] = priceParam.split('-').map(Number);
      setPriceRange([min || 0, max || 1000]);
    }
    if (searchParam) setSearchQuery(searchParam);
    if (brandParam) setSelectedBrands(brandParam.split(','));
  }, [searchParams]);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.category && newFilters.category !== 'All') {
      params.set('category', newFilters.category);
    }
    if (newFilters.price && (newFilters.price[0] !== 0 || newFilters.price[1] !== 1000)) {
      params.set('price', `${newFilters.price[0]}-${newFilters.price[1]}`);
    }
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }
    if (newFilters.brands && newFilters.brands.length > 0) {
      params.set('brand', newFilters.brands.join(','));
    }

    const newURL = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newURL, { scroll: false });
  };

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchQuery, selectedBrands]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    updateURL({ category, price: priceRange, search: searchQuery, brands: selectedBrands });
  };

  const handlePriceChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
    updateURL({ category: selectedCategory, price: newPriceRange, search: searchQuery, brands: selectedBrands });
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    updateURL({ category: selectedCategory, price: priceRange, search: query, brands: selectedBrands });
  };

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);
    updateURL({ category: selectedCategory, price: priceRange, search: searchQuery, brands });
  };

  return (
    <div>
      <div className="block md:hidden mb-4">
        <SearchBar onSearch={handleSearchChange} initialValue={searchQuery} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Sidebar
          categories={categories}
          brands={brands}
          selectedCategory={selectedCategory}
          selectedBrands={selectedBrands}
          onCategoryChange={handleCategoryChange}
          onBrandChange={handleBrandChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Product Listing</h1>
            <div className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              {searchQuery && <span className="ml-2">for &quot;{searchQuery}&quot;</span>}
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No products found</h2>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">Loading products...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}