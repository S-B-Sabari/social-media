import React from 'react'
import Title from './Title'
import { useSelector } from 'react-redux'
import ListingCard from './ListingCard'

const LatestListings = () => {
  
  const { listings } = useSelector(state => state.listing)

  return (
    <div className='mt-12 md:mt-20 mb-8'>
      <Title 
        title="Latest Listings" 
        description="Discover the hottest social profiles available right now."
      />

      {/* grid: sets the layout
          grid-cols-1: stacks cards one-by-one on mobile
          md:grid-cols-2: two cards side-by-side on tablets
          lg:grid-cols-4: four cards side-by-side on desktop
          px-4: small side padding for mobile
          lg:px-32: large side padding for desktop
      */}
      <div className='grid grid-cols-1 md:grid-cols-0 lg:grid-cols-1 gap-6 px-4 md:px-16 lg:px-40 mt-10'>
        {listings?.slice(0, 4).map((listing) => (
          <ListingCard 
            key={listing._id || listing.id} 
            listing={listing}
          />  
        ))}
      </div>
    </div>
  )
}

export default LatestListings