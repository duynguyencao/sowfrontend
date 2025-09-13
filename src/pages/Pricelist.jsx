import { useState, useEffect } from "react";
import { pricelistAPI } from "../services/api.js";
import './pricelist.css'

const PricelistPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPricelist = async () => {
            try {
                setLoading(true)
                const response = await pricelistAPI.getAll()
                setItems(response.data.data)
                setError(null)
            }
            catch (err) {
                setError('Failed top load pricelist')
            }
            finally {
                setLoading(false)
            }
        }
        fetchPricelist()
    }, [])

    const handleItemChange = async (id, field, value) => {
        setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item))
    }

    const handleSaveItem = async (id) => {
        const item = items.find(i => i.id === id)
        if (!item) return

        try {
            await pricelistAPI.update(id, item)
            console.log('itemupdated successfully')
        }
        catch (err) {
            console.log('error updating item')
        }
    }

    return (
        <div className="pricelist-page">
            <div className="pricelist-search-bar">
                <div className="search-fields">
                    <div className="search-field">
                        <input
                            type="text"
                            placeholder="Search Article No..."
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                    <div className="search-field">
                        <input
                            type="text"
                            placeholder="Search Product..."
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>
                </div>
                <div className="action-buttons">
                    <button className="action-btn new-product">
                        <span className="btn-icon">+</span>
                    </button>
                    <button className="action-btn print-list">
                        <span className="btn-icon">🖨️</span>
                    </button>
                    <button className="action-btn advanced-mode">
                        <span className="btn-icon">⚙️</span>
                    </button>
                </div>
            </div>

            <div className="pricelist-container">
                {loading ? (
                    <div className="loading">Loading pricelist...</div>
                ) : error ? (
                    <div className="error">Error: {error}</div>
                ) : (
                    <div className="pricelist-table-wrapper">
                        <table className="pricelist-table">
                            <thead>
                                <tr>
                                    <th className="col-article">Article No.</th>
                                    <th className="col-product">Product/Service</th>
                                    <th className="col-in-price">In Price</th>
                                    <th className="col-price">Price</th>
                                    <th className="col-unit">Unit</th>
                                    <th className="col-stock">In Stock</th>
                                    <th className="col-description">Description</th>
                                    <th className="col-actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id} className={index === 0 ? 'selected-row' : ''}>
                                        <td className="col-article">
                                            <div className="article-cell">
                                                <input
                                                    type="text"
                                                    value={item.article_no || '1234567890'}
                                                    onChange={(e) => handleItemChange(item.id, 'article_no', e.target.value)}
                                                    className="table-input"
                                                />
                                            </div>
                                        </td>
                                        <td className="col-product">
                                            <input
                                                type="text"
                                                value={item.product_service}
                                                onChange={(e) => handleItemChange(item.id, 'product_service', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="col-in-price">
                                            <input
                                                type="number"
                                                value={item.in_price}
                                                onChange={(e) => handleItemChange(item.id, 'in_price', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="col-price">
                                            <input
                                                type="number"
                                                value={item.price}
                                                onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="col-unit">
                                            <input
                                                type="text"
                                                value={item.unit}
                                                onChange={(e) => handleItemChange(item.id, 'unit', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="col-stock">
                                            <input
                                                type="number"
                                                value={item.in_stock || item.price}
                                                onChange={(e) => handleItemChange(item.id, 'in_stock', e.target.value)}
                                                className="table-input"
                                            />
                                        </td>
                                        <td className="col-description">
                                            <div className="description-cell">
                                                <input
                                                    type="text"
                                                    value={item.description}
                                                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                                    className="table-input"
                                                />
                                                <span className="more-icon">⋯</span>
                                            </div>
                                        </td>
                                        <td className="col-actions">
                                            <button
                                                onClick={() => handleSaveItem(item.id)}
                                                className="save-btn"
                                                title="Save changes"
                                            >
                                                💾
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}


export default PricelistPage