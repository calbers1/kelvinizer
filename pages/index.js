import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
	const [currentWeather, setCurrentWeather] = useState({})
	const [weatherMessage, setWeatherMessage] = useState('Loading Weather...')

	const getWeatherData = async (zip_code) => {
		const currentWeatherReq =
			'https://api.weatherapi.com/v1/forecast.json?key=' +
			process.env.NEX_PUBLIC_API_KEY +
			'&q=' +
			zip_code +
			'&days=1&aqi=no&alerts=no'

		const currentWeatherRes = await fetch(currentWeatherReq)
		const currentWeatherJSON = await currentWeatherRes.json()
		setCurrentWeather(currentWeatherJSON)
	}

	const kelvinize = (temp_c) => {
		const kelvin = parseFloat(temp_c) + 274.15
		return kelvin.toFixed(2)
	}

	useEffect(() => {
		const setup = async () => {
			await getWeatherData('74133')
		}
		setup()
	}, [])

	useEffect(() => {
		if (currentWeather.location != null) {
			setWeatherMessage(
				<>
					{' '}
					<p>
						The current temperature in {currentWeather.location.name},{' '}
						{currentWeather.location.region} is{' '}
						<b>{kelvinize(currentWeather.current.temp_c)} kelvins.</b>
					</p>
					<p>
						It feels like{' '}
						<b>{kelvinize(currentWeather.current.feelslike_c)} kelvins.</b>
					</p>
					<p>
						The high will be{' '}
						<b>
							{kelvinize(currentWeather.forecast.forecastday[0].day.maxtemp_c)}{' '}
							kelvins.
						</b>
					</p>
					<p>
						The low will be{' '}
						<b>
							{kelvinize(currentWeather.forecast.forecastday[0].day.mintemp_c)}{' '}
							kelvins.
						</b>
					</p>
				</>
			)
		}
	}, [currentWeather])

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>{weatherMessage}</main>
		</div>
	)
}
