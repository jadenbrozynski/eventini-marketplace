'use client';

import { OnboardingData, MenuItem, CateringPackage } from '../types';
import OnboardingStepWrapper from '../OnboardingStepWrapper';
import { useState } from 'react';

interface MenuManagementProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

type MenuTab = 'a-la-carte' | 'catering';

export default function MenuManagement({ data, updateData, onNext, onBack }: MenuManagementProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>('a-la-carte');
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ name: '', description: '', price: 0, category: '' });
  const [newPackage, setNewPackage] = useState<Partial<CateringPackage>>({ name: '', description: '', pricePerPerson: 0, minimumGuests: 10, items: [] });
  const [packageItemInput, setPackageItemInput] = useState('');

  const categories = ['Appetizers', 'Main Courses', 'Sides', 'Desserts', 'Beverages', 'Other'];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;
    const item: MenuItem = { id: Date.now().toString(), name: newItem.name, description: newItem.description || '', price: newItem.price, category: newItem.category || 'Other' };
    updateData({ aLaCarteMenu: [...data.aLaCarteMenu, item] });
    setNewItem({ name: '', description: '', price: 0, category: '' });
    setShowAddItem(false);
  };

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.pricePerPerson) return;
    const pkg: CateringPackage = { id: Date.now().toString(), name: newPackage.name, description: newPackage.description || '', pricePerPerson: newPackage.pricePerPerson, minimumGuests: newPackage.minimumGuests || 10, items: newPackage.items || [] };
    updateData({ cateringPackages: [...data.cateringPackages, pkg] });
    setNewPackage({ name: '', description: '', pricePerPerson: 0, minimumGuests: 10, items: [] });
    setShowAddPackage(false);
  };

  const handleAddPackageItem = () => {
    if (!packageItemInput.trim()) return;
    setNewPackage(prev => ({ ...prev, items: [...(prev.items || []), packageItemInput.trim()] }));
    setPackageItemInput('');
  };

  const removeMenuItem = (id: string) => updateData({ aLaCarteMenu: data.aLaCarteMenu.filter(item => item.id !== id) });
  const removePackage = (id: string) => updateData({ cateringPackages: data.cateringPackages.filter(pkg => pkg.id !== id) });

  const isValid = data.aLaCarteMenu.length > 0 || data.cateringPackages.length > 0;

  return (
    <OnboardingStepWrapper title="Menu management" subtitle="Add your menu items and catering packages" onNext={onNext} onBack={onBack} canContinue={isValid}>
      <div className="space-y-6">
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button onClick={() => setActiveTab('a-la-carte')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'a-la-carte' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>À La Carte ({data.aLaCarteMenu.length})</button>
          <button onClick={() => setActiveTab('catering')} className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === 'catering' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}>Catering Packages ({data.cateringPackages.length})</button>
        </div>

        {activeTab === 'a-la-carte' && (
          <div className="space-y-4">
            {data.aLaCarteMenu.length > 0 && (
              <div className="space-y-3">
                {data.aLaCarteMenu.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{item.category}</span>
                      </div>
                      {item.description && <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                      <button onClick={() => removeMenuItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {showAddItem ? (
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h4 className="font-medium text-gray-900">Add menu item</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1"><label className="block text-sm text-gray-600 mb-1">Item name</label><input type="text" value={newItem.name} onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Grilled Salmon" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div>
                  <div className="col-span-2 sm:col-span-1"><label className="block text-sm text-gray-600 mb-1">Price</label><div className="relative"><span className="absolute inset-y-0 left-4 flex items-center text-gray-500">$</span><input type="number" value={newItem.price || ''} onChange={(e) => setNewItem(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))} placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div></div>
                </div>
                <div><label className="block text-sm text-gray-600 mb-1">Category</label><select value={newItem.category} onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none bg-white"><option value="">Select category</option>{categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}</select></div>
                <div><label className="block text-sm text-gray-600 mb-1">Description (optional)</label><input type="text" value={newItem.description} onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))} placeholder="Brief description of the item" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAddItem(false)} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleAddItem} disabled={!newItem.name || !newItem.price} className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${newItem.name && newItem.price ? 'bg-[#44646c] text-white hover:bg-[#3a565d]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Add Item</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddItem(true)} className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#44646c] text-gray-600 hover:text-[#44646c] font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add menu item
              </button>
            )}
          </div>
        )}

        {activeTab === 'catering' && (
          <div className="space-y-4">
            {data.cateringPackages.length > 0 && (
              <div className="space-y-3">
                {data.cateringPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 bg-white rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between mb-2">
                      <div><h4 className="font-medium text-gray-900">{pkg.name}</h4>{pkg.description && <p className="text-sm text-gray-500 mt-0.5">{pkg.description}</p>}</div>
                      <button onClick={() => removePackage(pkg.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                    <div className="flex items-center gap-4 text-sm"><span className="font-semibold text-[#44646c]">${pkg.pricePerPerson}/person</span><span className="text-gray-500">Min {pkg.minimumGuests} guests</span></div>
                    {pkg.items.length > 0 && <div className="flex flex-wrap gap-1.5 mt-3">{pkg.items.map((item, idx) => <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{item}</span>)}</div>}
                  </div>
                ))}
              </div>
            )}
            {showAddPackage ? (
              <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                <h4 className="font-medium text-gray-900">Add catering package</h4>
                <div><label className="block text-sm text-gray-600 mb-1">Package name</label><input type="text" value={newPackage.name} onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))} placeholder="e.g., Premium BBQ Package" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-600 mb-1">Price per person</label><div className="relative"><span className="absolute inset-y-0 left-4 flex items-center text-gray-500">$</span><input type="number" value={newPackage.pricePerPerson || ''} onChange={(e) => setNewPackage(prev => ({ ...prev, pricePerPerson: parseFloat(e.target.value) || 0 }))} placeholder="0.00" className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div></div>
                  <div><label className="block text-sm text-gray-600 mb-1">Minimum guests</label><input type="number" value={newPackage.minimumGuests || ''} onChange={(e) => setNewPackage(prev => ({ ...prev, minimumGuests: parseInt(e.target.value) || 0 }))} placeholder="10" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div>
                </div>
                <div><label className="block text-sm text-gray-600 mb-1">Description (optional)</label><input type="text" value={newPackage.description} onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))} placeholder="Brief description of the package" className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /></div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Included items</label>
                  <div className="flex gap-2"><input type="text" value={packageItemInput} onChange={(e) => setPackageItemInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPackageItem())} placeholder="e.g., Pulled Pork" className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /><button onClick={handleAddPackageItem} className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors">Add</button></div>
                  {newPackage.items && newPackage.items.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">{newPackage.items.map((item, idx) => <span key={idx} className="text-xs px-2 py-1 bg-[#44646c]/10 text-[#44646c] rounded-full flex items-center gap-1">{item}<button onClick={() => setNewPackage(prev => ({ ...prev, items: prev.items?.filter((_, i) => i !== idx) }))} className="hover:text-red-500">×</button></span>)}</div>}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowAddPackage(false)} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={handleAddPackage} disabled={!newPackage.name || !newPackage.pricePerPerson} className={`flex-1 py-2.5 rounded-xl font-medium transition-colors ${newPackage.name && newPackage.pricePerPerson ? 'bg-[#44646c] text-white hover:bg-[#3a565d]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>Add Package</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowAddPackage(true)} className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#44646c] text-gray-600 hover:text-[#44646c] font-medium transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add catering package
              </button>
            )}
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Tax rate (optional)</label>
          <div className="relative w-32"><input type="number" value={data.taxRate || ''} onChange={(e) => updateData({ taxRate: parseFloat(e.target.value) || 0 })} placeholder="0" className="w-full px-4 py-2.5 pr-8 rounded-xl border border-gray-300 focus:border-[#44646c] focus:ring-1 focus:ring-[#44646c] outline-none" /><span className="absolute inset-y-0 right-4 flex items-center text-gray-500">%</span></div>
        </div>
      </div>
    </OnboardingStepWrapper>
  );
}
