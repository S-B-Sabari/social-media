import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getProfileLink, platformIcons } from '../assets/assets'
import {
  ArrowLeftIcon,
  ArrowUpRightFromSquareIcon,
  CheckCircle2,
  DollarSign,
  Loader2Icon,
  MapPin,
  ShoppingBag,
  MessageSquareMoreIcon,
  ChevronRight ,
  ChevronLeft
} from 'lucide-react'
import { setChat } from '../app/features/chatSlice'

const Detail = ({ label, value, icon }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="flex items-center font-medium capitalize gap-1">
      {icon}
      {value || '--'}
    </p>
  </div>
)

const ListingDetails = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$';


  const { listingId } = useParams()
  const { listings = [] } = useSelector((state) => state.listing)

  const [listing, setListing] = useState(null)
  const [current, setCurrent] = useState(0)


const prevImage = () => {
  setCurrent((prev) =>
    prev === 0 ? images.length - 1 : prev - 1
  )
}

const nextImage = () => {
  setCurrent((prev) =>
    prev === images.length - 1 ? 0 : prev + 1
  )
}



  const purchaseAccount = async () => {

  }

 const loadChatbox = () => {
  dispatch(setChat({listing: listing}))

}

 

  useEffect(() => {
    if (!listings.length) return
    const foundListing = listings.find(
      (item) => String(item.id) === String(listingId)
    )
    if (foundListing) {
      setListing(foundListing)
      setCurrent(0)
    }
  }, [listingId, listings])

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2Icon className="animate-spin text-indigo-600 w-6 h-6" />
      </div>
    )
  }

  const images = listing.images || []
  const profileLink = getProfileLink(listing.platform, listing.username)

  return (
    <div className="mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 py-5 hover:text-indigo-600"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Go to Previous Page
      </button>

      {/* MAIN LAYOUT */}
      <div className="flex items-start gap-10 max-md:flex-col">

        {/* LEFT SIDE */}
        <div className="flex-1 max-md:w-full">

          {/* Top Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-5">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl">
                {platformIcons[listing.platform]}
              </div>

              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                  {listing.title}
                  <Link to={profileLink} target="_blank">
                    <ArrowUpRightFromSquareIcon className="w-4 h-4 hover:text-indigo-500" />
                  </Link>
                </h2>

                <p className="text-gray-500 text-sm">
                  @{listing.username} •{' '}
                  {listing.platform?.charAt(0).toUpperCase() +
                    listing.platform?.slice(1)}
                </p>

                <div className="flex gap-2 mt-2">
                  {listing.verified && (
                    <span className="flex items-center text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                    </span>
                  )}
                  {listing.monetized && (
                    <span className="flex items-center text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md">
                      <DollarSign className="w-3 h-3 mr-1" /> Monetized
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Screenshots */}
          {images.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 mb-5 overflow-hidden">
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">
                  Screenshots & Proof
                </h4>
              </div>

              <div className="relative w-full aspect-video overflow-hidden">

                {/* LEFT ARROW */}
                {images.length > 1 && (
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10
          bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                )}

                {/* SLIDER */}
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${current * 100}%)` }}
                >
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Listing Proof"
                      className="w-full shrink-0 object-cover"
                    />
                  ))}
                </div>

                {/* RIGHT ARROW */}
                {images.length > 1 && (
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10
          bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                )}

              </div>
            </div>
          )}


          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 mb-5">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-800">Description</h4>
            </div>
            <div className="p-4 text-sm text-gray-600">
              {listing.description || 'No description provided.'}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-xl border border-gray-200 mb-5">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-semibold text-gray-800">
                Additional Details
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 text-sm">
              <Detail label="Niche" value={listing.niche} />
              <Detail
                label="Primary Country"
                value={listing.country}
                icon={<MapPin className="w-4 h-4 mr-1 text-gray-400" />}
              />
              <Detail label="Audience Age" value={listing.age_range} />
              <Detail
                label="Platform Verified"
                value={listing.platformAssured ? 'Yes' : 'No'}
              />
              <Detail
                label="Monetization"
                value={listing.monetized ? 'Enabled' : 'Disabled'}
              />
              <Detail label="Status" value={listing.status} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – SELLER INFO + ACTIONS IN SINGLE CARD */}
        <div className="w-full md:w:[300px] sticky top-24">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">

            {/* Seller Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Seller Information</h4>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={listing.owner?.image}
                  alt="seller"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-gray-800">{listing.owner?.name}</p>
                  <p className="text-sm text-gray-500">{listing.owner?.email}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Member Since{' '}
                <span className="font-medium">
                  {new Date(listing.owner?.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button onClick={loadChatbox} className="w-full bg-indigo-600 text-white py-2 rounded-lg
                hover:bg-indigo-700 transition text-sm font-medium flex items-center justify-center gap-2">
                <MessageSquareMoreIcon className="w-4 h-4" /> Chat
              </button>

              {listing.isCredentialChanged && (
                <button onClick={purchaseAccount} className="w-full bg-purple-600 text-white py-2 rounded-lg
                  hover:bg-purple-700 transition text-sm font-medium flex items-center justify-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> Purchase
                </button>
              )}
            </div>
          </div>
        </div>


      </div>
      {/* Footer */}
      <div className='bg-white border-t border-gray-200 p-4 text-center mt-28'>
        <p className='text-sm text-gray-500'>
          © 2025 <span className='text-indigo-600'>Sabre</span>.All rights reserved.
        </p>
      </div>
    </div>

  )
}

export default ListingDetails
