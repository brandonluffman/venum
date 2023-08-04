import React from 'react'
import Head from 'next/head';
import prisma from '../lib/prisma';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Stocks = ({ feed }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

  return (
    <div>
        {feed ? (
          feed.map((item, index) => (
            <div className='post-card' key={index}>
              <span style={{ fontWeight: 'bold' }}>{item.title}</span>
              <p>{item.ticker}</p>
              {/* <div>
                <button onClick={() => deletePost(item.id)}>{
                  loading ? "Loading": "Delete"
                }</button>
              </div> */}
            </div>
          ))
        ) : (
          <div>
            <p>No published posts found.</p>
          </div>
        )
      }
    </div>
  )
}

export default Stocks

