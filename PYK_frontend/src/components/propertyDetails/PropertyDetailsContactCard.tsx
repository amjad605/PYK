"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PropertyData, ListingType } from "@/types/property"
import formatPrice from "@/utils/formatPrice"
import calculateInstallment from "@/utils/calculateInstallment"

interface PropertyDetailsContactCardProps {
    property: PropertyData
}

const PropertyDetailsContactCard: React.FC<PropertyDetailsContactCardProps> = ({ property }) => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined)
    const [endDate, setEndDate] = useState<Date | undefined>(undefined)

    return (
        <Card className="border-0 shadow-lg bg-blue text-white overflow-hidden">
            <CardContent className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Payment Info */}
                    <div className="flex-1 p-4 bg-white/10 backdrop-blur-sm rounded-xl space-y-3 border border-white/20">
                        {property.price.amount && (
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Total Price</span>
                                <span className="font-semibold">{formatPrice(property.price.amount, property.price.currency)}</span>
                            </div>
                        )}
                        {property.price.paymentPlan?.downPayment && (
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Down Payment</span>
                                <span className="font-semibold">
                                    {formatPrice(property.price.paymentPlan.downPayment, property.price.currency)}
                                </span>
                            </div>
                        )}
                        {property.price.paymentPlan?.installments && (
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Installments</span>
                                <span className="font-semibold">
                                    <span className="font-bold text-xl">
                                        {(Math.floor(calculateInstallment(property.price) ?? 0) ?? 0).toLocaleString("en-US")}
                                    </span>{" "}
                                    EGP {property.price.paymentPlan.installments.frequency}
                                </span>
                            </div>
                        )}
                        {property.price.paymentPlan?.installments && (
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Years of installments</span>
                                <span className="font-semibold">{property.price.paymentPlan.installments.years} years</span>
                            </div>
                        )}

                        {property.listingType === ("rent" as ListingType) && (
                            <div className="w-full flex justify-center py-6">
                                <div className="rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 w-full">
                                    <Tabs defaultValue="calendar" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2 mb-4 bg-white">
                                            <TabsTrigger value="calendar" className="text-white data-[state=active]:bg-white">
                                                Calendar
                                            </TabsTrigger>
                                            <TabsTrigger value="dates" className="text-white data-[state=active]:bg-white">
                                                Date Range
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="calendar" className="flex justify-center">
                                            <Calendar numberOfMonths={2} className="rounded-lg border-none  [&_[data-outside]]:opacity-100
    [&_.rdp-weekday]:text-white [&_[data-outside]]:text-gray-800 [$_[days-outside]]:text-white data-[state=active]:bg-white text-white shadow-none px-10 py-14" />
                                        </TabsContent>

                                        <TabsContent value="dates" className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-blue-100 text-sm font-medium block">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={startDate ? startDate.toISOString().split("T")[0] : ""}
                                                    onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                                                    className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-blue-100 text-sm font-medium block">End Date</label>
                                                <input
                                                    type="date"
                                                    value={endDate ? endDate.toISOString().split("T")[0] : ""}
                                                    onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                                                    className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                                                />
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <div className="flex-1 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                        <h3 className="text-blue-100 mb-4 text-lg font-semibold text-center">Contact Agent</h3>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                            <textarea
                                placeholder="Message"
                                rows={4}
                                className="w-full p-3 rounded-lg border border-white/20 bg-white/20 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                            ></textarea>
                            <Button className="w-full mt-2 bg-white text-blue-700 hover:bg-blue-50">Send Message</Button>
                        </form>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default PropertyDetailsContactCard
