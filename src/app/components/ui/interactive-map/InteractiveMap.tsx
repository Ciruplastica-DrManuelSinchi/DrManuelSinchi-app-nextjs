'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

// Coordenadas de la clínica
const CLINIC_POSITION: [number, number] = [-12.107718742990034, -77.03253448893925]
const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Dr.+Manuel+Sinchi+-+Cirupl%C3%A1stica/@-12.107718742990034,-77.03253448893925,17z'

// Componente para centrar el mapa
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap()

    useEffect(() => {
        map.setView(center, zoom)
    }, [map, center, zoom])

    return null
}

// Crear icono personalizado
const createCustomIcon = () => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-container">
                <div class="marker-pulse"></div>
                <div class="marker-pin">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="marker-icon">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                </div>
            </div>
        `,
        iconSize: [50, 60],
        iconAnchor: [25, 60],
        popupAnchor: [0, -55],
    })
}

interface InteractiveMapProps {
    className?: string
}

export default function InteractiveMap({ className = '' }: InteractiveMapProps) {
    const [isClient, setIsClient] = useState(false)
    const [customIcon, setCustomIcon] = useState<L.DivIcon | null>(null)

    useEffect(() => {
        setIsClient(true)
        setCustomIcon(createCustomIcon())
    }, [])

    if (!isClient) {
        return (
            <div className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}>
                <div className="text-gray-400">Cargando mapa...</div>
            </div>
        )
    }

    return (
        <>
            <style jsx global>{`
                .custom-marker {
                    background: transparent;
                    border: none;
                }

                .marker-container {
                    position: relative;
                    width: 50px;
                    height: 60px;
                }

                .marker-pulse {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 20px;
                    background: rgba(57, 17, 66, 0.3);
                    border-radius: 50%;
                    animation: pulse 2s ease-out infinite;
                }

                @keyframes pulse {
                    0% {
                        transform: translateX(-50%) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translateX(-50%) scale(3);
                        opacity: 0;
                    }
                }

                .marker-pin {
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #391142;
                    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
                    transition: transform 0.3s ease;
                }

                .marker-pin:hover {
                    transform: translateX(-50%) scale(1.1);
                }

                .marker-icon {
                    width: 40px;
                    height: 50px;
                }

                .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    padding: 0;
                    overflow: hidden;
                }

                .leaflet-popup-content {
                    margin: 0;
                    min-width: 280px;
                }

                .leaflet-popup-tip {
                    background: white;
                }

                .leaflet-container {
                    font-family: inherit;
                }

                .popup-content {
                    padding: 0;
                }

                .popup-header {
                    background: linear-gradient(135deg, #391142 0%, #5a2d6a 100%);
                    padding: 16px;
                    color: white;
                }

                .popup-header h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 4px 0;
                    color: #d4a853;
                }

                .popup-header p {
                    font-size: 13px;
                    margin: 0;
                    opacity: 0.9;
                }

                .popup-body {
                    padding: 16px;
                }

                .popup-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .popup-item:last-child {
                    margin-bottom: 0;
                }

                .popup-item-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: rgba(57, 17, 66, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    color: #391142;
                }

                .popup-item-text {
                    font-size: 13px;
                    color: #374151;
                    line-height: 1.4;
                }

                .popup-item-text strong {
                    display: block;
                    color: #111827;
                    margin-bottom: 2px;
                }

                .popup-cta {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #d4a853 0%, #c49743 100%);
                    color: #391142;
                    padding: 12px 16px;
                    font-weight: 600;
                    font-size: 14px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .popup-cta:hover {
                    filter: brightness(1.1);
                }

                .leaflet-control-zoom {
                    border: none !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                    border-radius: 12px !important;
                    overflow: hidden;
                }

                .leaflet-control-zoom a {
                    background: white !important;
                    color: #391142 !important;
                    border: none !important;
                    width: 36px !important;
                    height: 36px !important;
                    line-height: 36px !important;
                    font-size: 18px !important;
                    transition: background 0.2s ease !important;
                }

                .leaflet-control-zoom a:hover {
                    background: #f3f4f6 !important;
                }

                .leaflet-control-attribution {
                    background: rgba(255, 255, 255, 0.8) !important;
                    padding: 4px 8px !important;
                    font-size: 10px !important;
                    border-radius: 4px 0 0 0 !important;
                }
            `}</style>

            <MapContainer
                center={CLINIC_POSITION}
                zoom={16}
                scrollWheelZoom={false}
                className={`w-full h-full ${className}`}
                style={{ minHeight: '400px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                <MapController center={CLINIC_POSITION} zoom={16} />

                {customIcon && (
                    <Marker position={CLINIC_POSITION} icon={customIcon}>
                        <Popup>
                            <div className="popup-content">
                                <div className="popup-header">
                                    <h3>CIRUPLÁSTICA</h3>
                                    <p>Dr. Manuel Sinchi - Cirujano Plástico</p>
                                </div>
                                <div className="popup-body">
                                    <div className="popup-item">
                                        <div className="popup-item-icon">
                                            <MapPin size={16} />
                                        </div>
                                        <div className="popup-item-text">
                                            <strong>Dirección</strong>
                                            Av. Javier Prado Este 499, San Isidro
                                        </div>
                                    </div>
                                    <div className="popup-item">
                                        <div className="popup-item-icon">
                                            <Phone size={16} />
                                        </div>
                                        <div className="popup-item-text">
                                            <strong>Teléfono</strong>
                                            +51 961 360 074
                                        </div>
                                    </div>
                                    <div className="popup-item">
                                        <div className="popup-item-icon">
                                            <Clock size={16} />
                                        </div>
                                        <div className="popup-item-text">
                                            <strong>Horario</strong>
                                            Lun - Sáb: 9:00 AM - 7:00 PM
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={GOOGLE_MAPS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="popup-cta"
                                >
                                    <ExternalLink size={16} />
                                    Abrir en Google Maps
                                </a>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </>
    )
}
