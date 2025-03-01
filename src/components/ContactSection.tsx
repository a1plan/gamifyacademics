
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { School, Mail, Phone, Users, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
    requestType: 'demo'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequestTypeChange = (type: string) => {
    setFormData(prev => ({ ...prev, requestType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.schoolName || !formData.email || !formData.message) {
      toast({
        title: "Please fill out all required fields",
        description: "School name, email, and message are required",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      setIsSubmitting(false);
      setFormData({
        schoolName: '',
        contactName: '',
        email: '',
        phone: '',
        message: '',
        requestType: 'demo'
      });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-kg-primary mb-4 text-brand-mindsmaidaan-navy">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Request a demo, ask about pricing, or simply learn more about how MindsMaidaan can enhance learning at your school
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-brand-mindsmaidaan-navy text-white p-8 rounded-xl h-full">
              <h3 className="text-2xl font-fredoka mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-white/10 p-2 rounded-full">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Email Us</p>
                    <p className="text-white/80">info@mindsmaidaan.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-white/10 p-2 rounded-full">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Call Us</p>
                    <p className="text-white/80">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-white/10 p-2 rounded-full">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Follow Us</p>
                    <div className="flex space-x-4 mt-2">
                      <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.98 0a6.9 6.9 0 01.702.031c.166.014.326.038.49.059.078.014.15.032.228.049.563.149 1.084.399 1.576.745.059.05.15.094.196.139.048.059.08.122.138.17.413.414.729.88.975 1.394.098.188.172.382.249.577.05.195.091.394.122.591.015.098.049.195.058.292.036.43.058.865.053 1.298-.017 1.085-.17 2.167-.498 3.208-.205.663-.549 1.379-.877 1.893-.208.258-.405.534-.653.771l-.146.129c-.018.024-.141.124-.058.161.076.037.328-.119.361-.141.076-.045.166-.094.259-.139.166-.059.319-.138.484-.195.109-.023.197-.06.299-.094.124-.085.245-.17.363-.266.032-.026.065-.052.097-.088.145-.145.268-.312.376-.488.129-.21.228-.436.309-.671.026-.085.044-.17.061-.259.036-.197.058-.394.079-.592.033-.359.058-.717.045-1.075 0-.09-.014-.18-.021-.269-.015-.18-.038-.36-.069-.536-.03-.169-.071-.335-.109-.503-.073-.295-.137-.591-.247-.865-.172-.428-.366-.85-.646-1.214-.29-.387-.677-.732-1.114-.96-.233-.115-.445-.258-.702-.333-.126-.039-.254-.078-.38-.115-.141-.029-.282-.063-.427-.066-.099-.005-.198-.005-.297 0-.124.015-.248.035-.373.061-.152.035-.3.078-.452.117-.122.053-.243.109-.36.174-.259.141-.513.316-.753.483-.24.17-.494.312-.718.503-.198.17-.341.388-.518.577-.185.214-.368.428-.547.645-.112.141-.229.287-.324.439-.073.134-.143.283-.198.428-.119.345-.243.696-.323 1.056-.067.299-.142.612-.152.92-.005.152.013.302.023.453.006.08.023.163.032.242.011.112.033.218.056.33.077.28.155.56.27.83.101.22.217.433.351.637.134.202.267.407.417.597.157.176.337.348.495.519.244.269.538.49.779.757.121.128.254.249.378.376.027.027.214.253.139.194-.043-.066-.233-.262-.071-.082.164.157.328.294.506.428.172.118.343.25.533.346.104.038.207.094.311.135.239.079.485.132.735.169.231.029.463.045.695.054.208.003.416.012.624-.003.273-.044.544-.069.805-.15.334-.106.666-.223.969-.4.08-.052.16-.096.24-.154.236-.18.45-.383.645-.615.067-.084.133-.17.188-.258.232-.392.415-.815.584-1.239.071-.179.143-.357.195-.545.057-.221.114-.442.135-.67.01-.075.016-.157.023-.235.016-.171.021-.343.034-.515.007-.086.01-.175.013-.262.013-.389.002-.78-.04-1.169-.031-.274-.079-.549-.128-.821-.016-.1-.058-.189-.084-.287-.02-.083-.044-.167-.069-.249-.093-.25-.182-.5-.289-.744-.086-.183-.184-.36-.284-.538-.102-.179-.208-.356-.322-.529-.111-.162-.237-.313-.356-.467-.128-.155-.29-.294-.399-.465-.015-.029-.034-.049-.054-.076-.065-.076-.15-.149-.214-.231-.12-.147-.243-.293-.376-.431-.073-.075-.146-.154-.224-.228-.084-.072-.147-.134-.24-.195l-.15-.117c-.1-.056-.194-.111-.29-.176-.315-.241-.657-.456-.977-.681-.254-.179-.478-.388-.737-.55-.248-.147-.504-.278-.756-.415-.148-.081-.296-.161-.443-.243-.083-.045-.173-.08-.252-.129-.121-.082-.237-.154-.358-.23-.094-.06-.193-.111-.299-.153-.231-.091-.465-.165-.697-.246-.146-.046-.292-.1-.441-.133-.134-.022-.267-.058-.401-.08-.17-.02-.339-.045-.51-.054-.226-.011-.453-.032-.68-.026-.174 0-.347.023-.52.036-.257.018-.51.065-.763.112-.217.045-.431.11-.649.15-.192.033-.327.035-.59.058z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-xl font-fredoka mb-4">Our Office</h4>
                <p className="text-white/80">
                  123 Education Lane, <br />
                  Tech Park, Bengaluru - 560001, <br />
                  Karnataka, India
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-fredoka mb-6 text-brand-mindsmaidaan-navy">Send us a Message</h3>
              
              <div className="flex space-x-2 mb-6">
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    formData.requestType === 'demo'
                      ? 'bg-brand-mindsmaidaan-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleRequestTypeChange('demo')}
                >
                  Request Demo
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    formData.requestType === 'pricing'
                      ? 'bg-brand-mindsmaidaan-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleRequestTypeChange('pricing')}
                >
                  Pricing Inquiry
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    formData.requestType === 'other'
                      ? 'bg-brand-mindsmaidaan-navy text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => handleRequestTypeChange('other')}
                >
                  Other
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    name="schoolName"
                    placeholder="School Name *"
                    className="pl-10"
                    value={formData.schoolName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      name="contactName"
                      placeholder="Contact Person Name"
                      className="pl-10"
                      value={formData.contactName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="pl-10"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <Textarea
                  name="message"
                  placeholder="Your Message *"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-mindsmaidaan-teal hover:bg-brand-mindsmaidaan-teal/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
